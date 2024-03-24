
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
