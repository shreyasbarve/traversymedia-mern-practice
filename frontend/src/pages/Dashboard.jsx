import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// redux
import { useSelector, useDispatch } from "react-redux";
import { getGoals, reset } from "../features/goals/goalSlice";
// components
import { GoalForm, GoalItem, Spinner } from "../components/";

function Dashboard() {
  // This is to check if user is logged in but better approach is RequireAuth
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, dispatch, isError, message]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
