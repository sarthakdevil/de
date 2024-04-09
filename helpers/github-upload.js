import { Octokit } from "@octokit/rest";
import fs from "fs";
import crypto from "crypto";

// Authentication
const octokit = new Octokit({
  auth: dddd,
});

// Repository Information
const owner = process.env.OWNER;
const repo = process.env.REPO;
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
