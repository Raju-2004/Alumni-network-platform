const io = require('socket.io')(8900, {
    cors: {
        origin: 'http://localhost:3000',
    }
});

let users = [];

const getUser = (userId, socketId) => {
    return users.find(user => user.userId === userId && user.socketId !== socketId);
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) &&
        users.push({ userId, socketId });
}

io.on("connection", (socket) => {
    console.log("a user connected");
    // when connect
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id); // Pass socket.id here
        io.emit("getUsers", users);
    });

    // send and get message
    socket.on("sendMessage", ({ userId, receiverId, text }) => {
        const user = getUser(receiverId, socket.id); // Change to receiverId
        if (user) {
            io.to(user.socketId).emit("getMessage", {
                senderId: userId, // Use userId here
                text
            });
        }
    });

    // when disconnect
    socket.on("disconnect", () => {
        console.log("a user is disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});
