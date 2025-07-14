// api/write.js

import { Octokit } from "octokit";

export default async function handler(req, res) {
  const { filename, content } = req.body;

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  try {
    const repo = process.env.GITHUB_REPO;
    const owner = process.env.GITHUB_USERNAME;

    let sha = null;
    try {
      const { data } = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner,
          repo,
          path: filename,
        }
      );
      sha = data.sha;
    } catch (e) {}

    await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
      owner,
      repo,
      path: filename,
      message: "📝 語靈寫入",
      content: Buffer.from(content).toString("base64"),
      sha: sha || undefined,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
