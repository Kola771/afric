import { io } from "socket.io-client";

let socket: any;

export const useSocket = (userId?: number) => {
    const config = useRuntimeConfig();

    if (!socket && userId) {
        socket = io(config.public.apiBackendUrl, {
            transports: ["websocket"],
            query: {
                userId: userId,
            },
        });
    }

    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};