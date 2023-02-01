module.exports = {
  onPreBuild: function ({ inputs, netlifyConfig, utils }) {
    try {
      const ignoreSiteId = inputs.ignore_site_id;
      if (process.env.SITE_ID === ignoreSiteId) {
        console.log("Site ID is configured to be ignored. Not running");
        return;
      }
      const localesStr = inputs.locales || "";
      const localesArr = localesStr.split(",").map((item) => item.trim()); // split string by comma and strip spaces
      const baseHost = inputs.base_host;
      // for (const locale of localesArr) {
      //   console.log(`Adding rewrite proxy to https://${getRewriteHostPrefix()}${baseHost}/${locale}/:splat`);
      //   netlifyConfig.redirects.push({
      //     from: `/${locale}/*`,
      //     to: `https://${getRewriteHostPrefix()}${baseHost}/${locale}/:splat`,
      //     status: 200,
      //     force: true,
      //   });
      // }
      netlifyConfig.redirects.push({
        from: "/",
        to: "https://petsofnetlify.com",
        status: 200,
        force: true,
      })
    } catch (err) {
      utils.build.failBuild("Error processing EU proxy redirects:", { error: String(err) });
    }
  },
};

const getRewriteHostPrefix = function () {
  const buildContext = process.env.CONTEXT;

  switch (buildContext) {
    case "build-preview":
      return "test--";
    case "branch-deploy":
      return `${process.env.BRANCH}--`;
    default:
      return "";
  }
};