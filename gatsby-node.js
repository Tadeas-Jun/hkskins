const fs = require("fs");
const path = require("path");

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  const skinsDir = path.resolve(__dirname, "static/skins");

  // Check if directory exists
  if (fs.existsSync(skinsDir)) {
    const subDirs = fs.readdirSync(skinsDir);

    subDirs.forEach((subDir) => {
      const knightImagePath = path.join(skinsDir, subDir, "preview.png");
      const metadataPath = path.join(skinsDir, subDir, "metadata.json");

      if (fs.existsSync(knightImagePath) && fs.existsSync(metadataPath)) {
        const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));

		console.log(`Found valid subDir: ${subDir}`);

        const fileNode = {
          id: createNodeId(`knight-skin-${subDir}`),
          subDir,
          imagePath: `/skins/${encodeURIComponent(subDir)}/preview.png`, // URL-encoded path
          metadata,
          internal: {
            type: "Skin",
            contentDigest: createContentDigest({ subDir, knightImagePath, metadata }),
          },
        };

        createNode(fileNode);
      }
    });
  }
};
