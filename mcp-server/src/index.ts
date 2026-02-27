
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import process from "node:process";
import { GitHubService } from "./services/github.js";
import { FirebaseService } from "./services/firebase.js";
import { DatabaseService } from "./services/db.js";

// Initialize Services
const github = new GitHubService();
const firebase = new FirebaseService();
const db = new DatabaseService();

const server = new Server(
  {
    name: "geevee-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// --- Tool Definitions ---

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // GitHub Tools
      {
        name: "github_read_file",
        description: "Read the content of a file from the GitHub repository.",
        inputSchema: {
          type: "object",
          properties: {
            owner: { type: "string" },
            repo: { type: "string" },
            path: { type: "string" },
          },
          required: ["owner", "repo", "path"],
        },
      },
      // Firebase Tools
      {
        name: "firebase_get_bookings",
        description: "Fetch booking records from Firebase Firestore.",
        inputSchema: {
          type: "object",
          properties: {
            limit: { type: "number", description: "Max records to fetch (default 10)" },
            status: { type: "string", description: "Filter by status (pending, confirmed, etc.)" },
          },
        },
      },
      // Local DB Tools
      {
        name: "db_query",
        description: "Run a read-only SQL query on the local SQLite database.",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string" },
            params: { type: "array", items: { type: "string" } },
          },
          required: ["query"],
        },
      },
    ],
  };
});

// --- Tool Execution ---

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    // --- GitHub Handlers ---
    if (name === "github_read_file") {
      const { owner, repo, path } = z
        .object({ owner: z.string(), repo: z.string(), path: z.string() })
        .parse(args);
      return await github.readFile(owner, repo, path);
    }

    // --- Firebase Handlers ---
    if (name === "firebase_get_bookings") {
      const { limit, status } = z
        .object({ limit: z.number().optional(), status: z.string().optional() })
        .parse(args);
      return await firebase.getBookings(limit, status);
    }

    // --- Local DB Handlers ---
    if (name === "db_query") {
      const { query, params } = z
        .object({ query: z.string(), params: z.array(z.any()).optional() })
        .parse(args);
      return await db.query(query, params || []);
    }

    throw new Error(`Unknown tool: ${name}`);
  } catch (error: any) {
    return {
      content: [
        {
          type: "text",
          text: `Error executing tool ${name}: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Start Server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Gee Vee MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
