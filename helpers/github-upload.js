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

async function uploadFileToGitHub(filePath, commitMessage = "commit") {
  try {
    const fileContent = fs.readFileSync(filePath);
    const fileName = `${Date.now()}${path.extname(filePath)}`;

    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      branch,
      path: fileName,
      message: commitMessage,
      content: Buffer.from(fileContent).toString("base64"),
    });

    console.log("File uploaded successfully:");
    return response;
  } catch (error) {
    console.error("GitHub API Error:", error.message);
    throw new Error("Error uploading File to GitHub");
  }
}
export { uploadFileToGitHub };
