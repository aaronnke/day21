Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '1542201602755935', '25a42150d3e474c2d4735af5a26b9389'
end