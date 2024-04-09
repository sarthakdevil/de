import { Octokit } from "@octokit/rest";
import fs from "fs";
import crypto from "crypto";

// Authentication
const octokit = new Octokit({
  auth: "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",
});

// Repository Information
const owner = "tushar1977";
const repo = "decadisaster-media";
const branch = "main";

function calculateFileHash(content) {
  const hash = crypto.createHash("sha256");
  hash.update(content);
  return hash.digest("hex");
}

async function uploadFileToGitHub(filePath, commitMessage = "commit") {
  try {
    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: filePath.split("/").slice(2).join("/"),
      message: commitMessage,
      content: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
    });

    console.log("File uploaded successfully:");
    return response;
  } catch (error) {
    console.error("GitHub API Error:", error.message);
    throw new Error("Error uploading File to GitHub");
  }
}
export { uploadFileToGitHub };
