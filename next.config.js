/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
  webpack: (config, { isServer, webpack }) => {
    // Prevent log4js from trying to bundle optional dependencies:
    // https://github.com/log4js-node/log4js-node/issues/1270
    // These modules are dynamically required by log4js but are optional.
    // If they are not actually used, we can tell webpack to ignore them.
    // Apply unconditionally to cover all contexts where log4js might try to load these.
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp:
          /^(hipchat-notifier|loggly|mailgun-js|slack-node|nodemailer|mysql)$/,
      }),
    );

    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
