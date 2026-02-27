
import { Octokit } from "octokit";
import { Buffer } from "node:buffer";

export class GitHubService {
  private octokit: Octokit;

  constructor() {
    if (!process.env.GITHUB_TOKEN) {
      console.warn("GITHUB_TOKEN is not set. GitHub tools will fail.");
    }
    this.octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  }

  async readFile(owner: string, repo: string, path: string) {
    try {
      const response = await this.octokit.rest.repos.getContent({
        owner,
        repo,
        path,
      });

      if (Array.isArray(response.data) || !('content' in response.data)) {
        throw new Error("Path points to a directory, not a file.");
      }

      const content = Buffer.from(response.data.content, "base64").toString("utf-8");
      
      return {
        content: [{ type: "text", text: content }],
      };
    } catch (error: any) {
      throw new Error(`GitHub API Error: ${error.message}`);
    }
  }
}
