const initState = {
  workers: [
    {
      id: "1",
      imagePath: "https://lorempixel.com/100/190/nature/6",
      name: "Sri Devi Bai",
      gender: "Female",
      workerType: "maid",
      aadharVerified: "Y",
      policeVerified: "Y"
    },
    {
      id: "2",
      imagePath: "https://lorempixel.com/100/190/nature/5",
      name: "Kanta Reddy",
      gender: "Female",
      workerType: "maid",
      aadharVerified: "Y",
      policeVerified: "Y"
    },
    {
      id: "3",
      imagePath: "https://lorempixel.com/100/190/nature/4",
      name: "Ranjeet Kumar",
      gender: "Male",
      workerType: "cook",
      aadharVerified: "N",
      policeVerified: "Y"
    },
    {
      id: "4",
      imagePath: "https://lorempixel.com/100/190/nature/3",
      name: "Raj Malhotra",
      gender: "Male",
      workerType: "cook",
      aadharVerified: "Y",
      policeVerified: "N"
    },
    {
      id: "5",
      imagePath: "https://lorempixel.com/100/190/nature/2",
      name: "Anil Sharma",
      gender: "Male",
      workerType: "cook",
      aadharVerified: "N",
      policeVerified: "Y"
    }
  ]
};

const workerReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_WORKER":
      console.log("create worker");
      return state;
    case "CREATE_WORKER_ERROR":
      console.log("create worker error", action.err);
      return state;
    default:
      return state;
  }
};

export default workerReducer;
