Sidekiq.configure_server do |config|
  config.redis = { url: 'redis://redistogo:4b4e612a0f17c615f6b578e6e4f5b3e6@barreleye.redistogo.com:10701/' }
  schedule_file = 'config/schedule.yml'
  if File.exists?(schedule_file)
    Sidekiq::Cron::Job.load_from_hash YAML.load_file(schedule_file)
  end
end

Sidekiq.configure_client do |config|
  config.redis = { url: 'redis://redistogo:4b4e612a0f17c615f6b578e6e4f5b3e6@barreleye.redistogo.com:10701/' }
end
