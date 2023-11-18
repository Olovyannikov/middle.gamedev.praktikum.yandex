import axios from 'axios';

const baseURL = 'https://ya-praktikum.tech/api/v2';

const api = axios.create({
    baseURL,
});

export const updatePassword = async (data) => {
    const response = await api.put('/user/password', data);
    return response.data;
};

export const updateAvatar = async (data) => {
    try {
        const formData = new FormData();
        formData.append('avatar', data);

        // Отправка файла на сервер методом PUT
        const response = await api.put('/user/avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Обработка успешного запроса
        console.log('Avatar upload successful:', response.data);

        // Здесь можно обновить состояние вашего компонента после успешной загрузки
    } catch (error) {
        // Обработка ошибок
        console.error('Error uploading avatar:', error);
    }
};
