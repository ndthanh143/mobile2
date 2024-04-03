import moment from "moment";
import { CurrentcyPositions, DATE_FORMAT_DISPLAY, DEFAULT_FORMAT } from "../constants";

export function limitCharacters(value, numOfCharacters) {
    if (!value || typeof value !== 'string') {
        return 'No data';
    }

    if (value.length <= numOfCharacters) {
        return value; // Trả về chuỗi không thay đổi nếu số ký tự nhỏ hơn hoặc bằng numOfCharacters
    } else {
        return value.slice(0, numOfCharacters) + '...'; // Trả về một phần của chuỗi với số ký tự được giới hạn
    }
}

export const convertUtcToLocalTime = (utcTime, inputFormat = DATE_FORMAT_DISPLAY, format = DATE_FORMAT_DISPLAY) => {
    try {
        if (utcTime) return moment(moment.utc(utcTime, inputFormat).toDate()).format(format);
        return '';
    } catch (err) {
        return '';
    }
};

export const formatMoney = (value, setting = {}) => {
    if ((value || value === 0) && !isNaN(value)) {
        const groupSeparator = setting.groupSeparator || '.';
        const decimalSeparator = setting.decimalSeparator || ',';
        const currentcy = setting.currentcy || '€';
        const currentcyPosition = setting.currentcyPosition || CurrentcyPositions.BACK;
        value = setting.currentDecimal ? (+value).toFixed(setting.currentDecimal) : (+value).toFixed(2);
        const decimalPosition = value.toString().indexOf('.');
        if (decimalPosition > 0) {
            const intVal = value.toString().substring(0, decimalPosition);
            const decimalVal = value.toString().substring(decimalPosition + 1);
            value = `${intVal.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator)}${decimalSeparator}${decimalVal}`;
        } else {
            value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
        }
        if (currentcyPosition === CurrentcyPositions.FRONT) {
            return `${currentcy} ${value}`;
        } else {
            return `${value} ${currentcy}`;
        }
    }
    return '';
};

export const calculateStars = (starData) => {
    let totalStars = 0;
    let totalRatings = 0;
    const ratingCount = Array(5).fill(0);

    if (Array.isArray(starData)) {
        starData?.forEach((item) => {
          totalStars += item.star * item.amount;
          totalRatings += item.amount;
      
          if (item.star >= 1 && item.star <= 5) {
            ratingCount[item.star - 1] += item.amount;
          }
        });
    } else {
        console.log("ko phải mảng")
    }
  
    const averageRating = totalRatings > 0 ? (totalStars / totalRatings).toFixed(1) : 0;
    const ratingPercentages = ratingCount.map((count) =>
      totalRatings > 0 ? Math.floor((count / totalRatings) * 100) : 0
    );
  
    return { averageRating, ratingPercentages };
  };

  export const formatTimeDifference = (utcTime, format = DEFAULT_FORMAT) => {
    const date = convertUtcToLocalTime(utcTime, format, format);
    const givenDate = moment(date, DEFAULT_FORMAT);
    const formattedDifference = givenDate.fromNow();
    return formattedDifference;
};