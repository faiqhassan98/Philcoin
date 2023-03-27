let rooms = [
    { type: "KING", capacity: 3, available: 1 },
    { type: "Medium", capacity: 2, available: 14 },
    { type: "X-L", capacity: 5, available: 2 },
    { type: "SMALL", capacity: 1, available: 14 },
];

let sorted_rooms = rooms.sort((a, b) => b.capacity - a.capacity);

let remainingguests = 5;
const sum = rooms.map((i) => i.capacity * i.available).reduce((i, e) => i + e);
const RoomAssigner = () => {
    console.log(sum, "sum");
    if (sum < remainingguests) {
        alert("Capacity error");
        return;
    }
    let assigned_rooms = [];
    for (let i = 0; i <= sorted_rooms.length - 1; i++) {
        for (let j = 0; j < sum; j++) {
            if (
                remainingguests >= sorted_rooms[i].capacity &&
                sorted_rooms[i].available > 0
            ) {
                assigned_rooms.push(sorted_rooms[i].type);
                sorted_rooms[i] = {
                    ...sorted_rooms[i],
                    available: sorted_rooms[i].available - 1,
                };
                remainingguests -= sorted_rooms[i].capacity;
            } else if (
                sorted_rooms[i + 1] !== undefined &&
                remainingguests >= sorted_rooms[i + 1].capacity &&
                sorted_rooms[i + 1].available > 0
            ) {
                assigned_rooms.push(sorted_rooms[i + 1].type);
                sorted_rooms[i + 1] = {
                    ...sorted_rooms[i + 1],
                    available: sorted_rooms[i + 1].available - 1,
                };
                remainingguests -= sorted_rooms[i + 1].capacity;
            }
        }
    }
    console.log(assigned_rooms, sorted_rooms);
};

RoomAssigner();