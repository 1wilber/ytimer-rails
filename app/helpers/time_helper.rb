module TimeHelper
  def ms_to_time(ms)
    time = ms.to_f / 1000

    return time if ms < 60000

    if ms < 3600000
      return "#{(time / 60).floor}:#{(time % 60).round(2).to_s.rjust(5, "0")}"
    end

    Time.at(time).utc.strftime("%M:%S.%L")
  end
end
