import ShowUserTasks from "../components/ShowUserTasks";

const UserTaskDashboard = () => {
 

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-zinc-950">
      <h2 className="text-3xl font-bold mb-8 text-zinc-800 dark:text-white">
        📋 Your Tasks
      </h2>
      <div className="">
      <ShowUserTasks/>
      </div>
    </div>
  );
};

export default UserTaskDashboard;
