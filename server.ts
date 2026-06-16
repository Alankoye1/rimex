import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

let localFilename = "";
let localDirname = "";

try {
  if (typeof import.meta !== "undefined" && import.meta.url) {
    localFilename = fileURLToPath(import.meta.url);
    localDirname = path.dirname(localFilename);
  } else {
    localFilename = __filename;
    localDirname = __dirname;
  }
} catch (e) {
  localFilename = typeof __filename !== "undefined" ? __filename : "";
  localDirname = typeof __dirname !== "undefined" ? __dirname : "";
}

const loadLocalEnv = () => {
  const envPath = path.resolve(localDirname || process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;

  const raw = fs.readFileSync(envPath, "utf8");
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
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // Helper to dynamically obtain initialized GoogleGenAI instance
  const getAi = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set. Please set it in the settings.");
    }
    
    return new GoogleGenAI({ 
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  };

  const isQuotaError = (error: any) => {
    const code = Number(error?.status || error?.code || error?.response?.status);
    const message = String(error?.message || "").toLowerCase();
    return code === 429 || message.includes("resource_exhausted") || message.includes("quota exceeded");
  };

  const isPermissionDeniedError = (error: any) => {
    const code = Number(error?.status || error?.code || error?.response?.status);
    const message = String(error?.message || "").toLowerCase();
    return code === 403 || message.includes("permission_denied") || message.includes("denied access");
  };

  const isTemporaryUnavailableError = (error: any) => {
    const code = Number(error?.status || error?.code || error?.response?.status);
    const message = String(error?.message || "").toLowerCase();
    return code === 503 || message.includes("unavailable") || message.includes("high demand");
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const canFallbackToFlash = (modelName?: string) => {
    if (!modelName) return true;
    if (modelName === "gemini-2.5-flash-image") return false;
    return !modelName.includes("flash");
  };

  const generateContentWithFallback = async ({
    modelName,
    contents,
    config,
  }: {
    modelName?: string;
    contents: any;
    config?: Record<string, any>;
  }) => {
    const ai = getAi();
    const primaryModel = modelName || "gemini-3.5-flash";
    const generate = async (model: string) => {
      const delays = [0, 1500, 3500, 7000];
      let lastError: any;

      for (const waitMs of delays) {
        if (waitMs > 0) await delay(waitMs);

        try {
          return await ai.models.generateContent({
            model,
            contents,
            config,
          });
        } catch (error: any) {
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
        fallbackUsed: false,
      };
    } catch (error: any) {
      if (!isQuotaError(error) || !canFallbackToFlash(primaryModel)) {
        throw error;
      }

      const fallbackModel = "gemini-3.5-flash";
      const response = await generate(fallbackModel);

      return {
        response,
        usedModel: fallbackModel,
        fallbackUsed: true,
      };
    }
  };

  // API Route for Gemini
  app.post("/api/gemini", async (req, res) => {
    try {
      const { model: modelName, contents, systemInstruction, config } = req.body;
      const result = await generateContentWithFallback({
        modelName,
        contents,
        config: {
          ...config,
          systemInstruction: systemInstruction
        }
      });

      res.json({
        text: result.response.text,
        candidates: result.response.candidates,
        usageMetadata: result.response.usageMetadata,
        usedModel: result.usedModel,
        fallbackUsed: result.fallbackUsed
      });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      const statusCode = Number(error?.status || error?.code || error?.response?.status || 500);
      const isDenied = isPermissionDeniedError(error);
      res.status(Number.isFinite(statusCode) ? statusCode : 500).json({
        error: isDenied
          ? "Your Gemini project has been denied access. Please use a different project/API key or contact Google support."
          : error?.message || "An error occurred with Gemini API",
        friendlyMessage: isDenied
          ? "Gemini access is blocked for this project. The app cannot fix this automatically."
          : undefined,
        status: error?.status,
        code: error?.code,
      });
    }
  });

  // Chat session proxy (stateless)
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { model: modelName, history, message, systemInstruction, config } = req.body;
      const userParts = typeof message === 'string' ? [{ text: message }] : message;
      const contents = [...(history || []), { role: 'user', parts: userParts }];

      const result = await generateContentWithFallback({
        modelName,
        contents,
        config: {
          ...config,
          systemInstruction: systemInstruction
        }
      });

      res.json({
        text: result.response.text,
        candidates: result.response.candidates,
        usageMetadata: result.response.usageMetadata,
        usedModel: result.usedModel,
        fallbackUsed: result.fallbackUsed
      });
    } catch (error: any) {
      console.error("Gemini Chat Error:", error);
      const statusCode = Number(error?.status || error?.code || error?.response?.status || 500);
      const isDenied = isPermissionDeniedError(error);
      res.status(Number.isFinite(statusCode) ? statusCode : 500).json({
        error: isDenied
          ? "Your Gemini project has been denied access. Please use a different project/API key or contact Google support."
          : error?.message || "An error occurred with Gemini API",
        friendlyMessage: isDenied
          ? "Gemini access is blocked for this project. The app cannot fix this automatically."
          : undefined,
        status: error?.status,
        code: error?.code,
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(localDirname);
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
