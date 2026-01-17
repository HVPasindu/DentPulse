import { useEffect } from "react";
import { getAiRecommendation } from "../api/aiRecommendationApi";
import { timedata } from "../data/timedata";

const Recommendation = ({ selectDate, setAiSlots }) => {
  useEffect(() => {
    if (!selectDate) return;

    const fetchAiBusySlots = async () => {
      try {
        let dayOfWeek = selectDate.getDay();
        dayOfWeek = (dayOfWeek + 6) % 7; // 1 = Sunday
        const month = selectDate.getMonth() + 1; // January = 0

        const weekdayOrWeekend =
          dayOfWeek === 5 || dayOfWeek === 6 ? 1 : 0;

        // ✅ ONLY FILTER TIMES (structure unchanged)
        const filteredTimes =
          weekdayOrWeekend === 0
            ? ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"]
            : timedata; // weekends: existing (10:00–16:30)

        const results = await Promise.all(
          filteredTimes.map(async (time) => {
            const [h, m] = time.split(":").map(Number);
            const hour = h + m / 60;

            const payload = {
              weekdayOrWeekend,
              month,
              dayOfWeek,
              hour,
            };

            const res = await getAiRecommendation(payload);

            return {
              time,
              busyLevel: res.busyLabel,
            };
          })
        );

        setAiSlots(results);
      } catch (err) {
        console.error("AI Recommendation fetch error:", err.response || err);
      }
    };

    fetchAiBusySlots();
  }, [selectDate, setAiSlots]);

  return null; // 🔥 NO UI
};

export default Recommendation;
