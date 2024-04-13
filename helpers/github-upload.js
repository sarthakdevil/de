import { Octokit } from "@octokit/rest";
import fs from "fs";
import crypto from "crypto";
import path from "path";
// Authentication
const octokit = new Octokit({
  auth: process.env.AUTH,
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

async function uploadFileToGitHub(filePath,commitMessage = "commit") {
  try {
    console.log(filePath,path.resolve(filePath))
    console.log(filePath)
    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      branch,
      path: `${Date.now()}${path.extname(filePath)}`,
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
