var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_genai = require("@google/genai");
var import_meta = {};
var localFilename = "";
var localDirname = "";
try {
  if (typeof import_meta !== "undefined" && import_meta.url) {
    localFilename = (0, import_url.fileURLToPath)(import_meta.url);
    localDirname = import_path.default.dirname(localFilename);
  } else {
    localFilename = __filename;
    localDirname = __dirname;
  }
} catch (e) {
  localFilename = typeof __filename !== "undefined" ? __filename : "";
  localDirname = typeof __dirname !== "undefined" ? __dirname : "";
}
var loadLocalEnv = () => {
  const envPath = import_path.default.resolve(localDirname || process.cwd(), ".env.local");
  if (!import_fs.default.existsSync(envPath)) return;
  const raw = import_fs.default.readFileSync(envPath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (key && !(key in process.env)) {
      process.env[key] = value;
    }
  }
};
async function startServer() {
  loadLocalEnv();
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "50mb" }));
  const getAi = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set. Please set it in the settings.");
    }
    return new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  };
  const isQuotaError = (error) => {
    const code = Number(error?.status || error?.code || error?.response?.status);
    const message = String(error?.message || "").toLowerCase();
    return code === 429 || message.includes("resource_exhausted") || message.includes("quota exceeded");
  };
  const isPermissionDeniedError = (error) => {
    const code = Number(error?.status || error?.code || error?.response?.status);
    const message = String(error?.message || "").toLowerCase();
    return code === 403 || message.includes("permission_denied") || message.includes("denied access");
  };
  const isTemporaryUnavailableError = (error) => {
    const code = Number(error?.status || error?.code || error?.response?.status);
    const message = String(error?.message || "").toLowerCase();
    return code === 503 || message.includes("unavailable") || message.includes("high demand");
  };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const canFallbackToLighterModel = (modelName) => {
    if (!modelName) return true;
    if (modelName === "gemini-2.5-flash-image") return false;
    return modelName !== "gemini-3.1-flash-lite";
  };
  const generateContentWithFallback = async ({
    modelName,
    contents,
    config
  }) => {
    const ai = getAi();
    const primaryModel = modelName || "gemini-3.1-flash-lite";
    const generate = async (model) => {
      const delays = [0, 1500, 3500, 7e3];
      let lastError;
      for (const waitMs of delays) {
        if (waitMs > 0) await delay(waitMs);
        try {
          return await ai.models.generateContent({
            model,
            contents,
            config
          });
        } catch (error) {
          lastError = error;
          if (!isTemporaryUnavailableError(error)) {
            throw error;
          }
        }
      }
      throw lastError;
    };
    try {
      return {
        response: await generate(primaryModel),
        usedModel: primaryModel,
        fallbackUsed: false
      };
    } catch (error) {
      if (!isQuotaError(error) && !isTemporaryUnavailableError(error) || !canFallbackToLighterModel(primaryModel)) {
        throw error;
      }
      const fallbackModel = "gemini-3.1-flash-lite";
      const response = await generate(fallbackModel);
      return {
        response,
        usedModel: fallbackModel,
        fallbackUsed: true
      };
    }
  };
  app.post("/api/gemini", async (req, res) => {
    try {
      const { model: modelName, contents, systemInstruction, config } = req.body;
      const result = await generateContentWithFallback({
        modelName,
        contents,
        config: {
          ...config,
          systemInstruction
        }
      });
      res.json({
        text: result.response.text,
        candidates: result.response.candidates,
        usageMetadata: result.response.usageMetadata,
        usedModel: result.usedModel,
        fallbackUsed: result.fallbackUsed
      });
    } catch (error) {
      console.error("Gemini Error:", error);
      const statusCode = Number(error?.status || error?.code || error?.response?.status || 500);
      const isDenied = isPermissionDeniedError(error);
      res.status(Number.isFinite(statusCode) ? statusCode : 500).json({
        error: isDenied ? "Your Gemini project has been denied access. Please use a different project/API key or contact Google support." : error?.message || "An error occurred with Gemini API",
        friendlyMessage: isDenied ? "Gemini access is blocked for this project. The app cannot fix this automatically." : void 0,
        status: error?.status,
        code: error?.code
      });
    }
  });
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { model: modelName, history, message, systemInstruction, config } = req.body;
      const userParts = typeof message === "string" ? [{ text: message }] : message;
      const contents = [...history || [], { role: "user", parts: userParts }];
      const result = await generateContentWithFallback({
        modelName,
        contents,
        config: {
          ...config,
          systemInstruction
        }
      });
      res.json({
        text: result.response.text,
        candidates: result.response.candidates,
        usageMetadata: result.response.usageMetadata,
        usedModel: result.usedModel,
        fallbackUsed: result.fallbackUsed
      });
    } catch (error) {
      console.error("Gemini Chat Error:", error);
      const statusCode = Number(error?.status || error?.code || error?.response?.status || 500);
      const isDenied = isPermissionDeniedError(error);
      res.status(Number.isFinite(statusCode) ? statusCode : 500).json({
        error: isDenied ? "Your Gemini project has been denied access. Please use a different project/API key or contact Google support." : error?.message || "An error occurred with Gemini API",
        friendlyMessage: isDenied ? "Gemini access is blocked for this project. The app cannot fix this automatically." : void 0,
        status: error?.status,
        code: error?.code
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.resolve(localDirname);
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
