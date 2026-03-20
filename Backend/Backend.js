import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";

import upcomingEventRoutes from "./routes/upcomingEventRoutes.js";
import upcomingEventWithSpecificIdRoutes from "./routes/upcomingEventFetchWithSpecificIdRoutes.js";
import activityFetchWithBatchRoutes from "./routes/activityFetchWithBatchRoutes.js";
import activityFetchWithSpecificBatchRoutes from "./routes/activityFetchWithSpecificBatchRoutes.js";
import activityFetchWithSpecificEventRoutes from "./routes/activityFetchWithSpecificEventRoutes.js";
import associationAllBatchRoutes from "./routes/associationAllBatchRoutes.js";
import associationSpecificBatchRoutes from "./routes/associationSpecificBatchRoutes.js";
import gloriesRoutes from "./routes/gloriesRoutes.js";
import otpsendRoutes from "./routes/otpsendRoutes.js";
import otpverifyRoutes from "./routes/otpverifyRoutes.js";
import ProblemCreationRequestRoutes from "./routes/ProblemCreationRequestRoutes.js";
import currentProblemsRoutes from "./routes/currentProblemsRoutes.js";
import SpecificCurrentProblemRoutes from "./routes/SpecificCurrentProblemRoutes.js";
import AddProblemSolverRequestRoutes from "./routes/AddProblemSolverRequestRoutes.js";
import suggestionRoutes from "./routes/suggestionRoutes.js";
import Admin_addCelebrationRoute from "./routes/Admin_addCelebrationRouters.js";
import Admin_addEventRouter from "./routes/Admin_addEventRouter.js";
import AdminAnnouncementFetchRoutes from "./routes/Admin_AnnouncementPageFetchRoutes.js";
import AdminFetchSpecificRoutes from "./routes/Admin_FetchSpecificEventOrCelebrationRoutes.js";
import AdminEditRoutes from "./routes/Admin_EditEventOrCelebrationRoutes.js";
import AdminDeleteRoutes from "./routes/Admin_DeleteSpecificEventRoutes.js";
import AdminActivityBatchesRoutes from "./routes/Admin_ActivityAllBatchesRoutes.js";
import AdminActivitySpecificBatchRoutes from "./routes/Admin_ActivitySpecificBatchAllEventRoutes.js";
import AdminAddActivityRoutes from "./routes/Admin_AddActivityRoutes.js";
import AdminEditActivityRoutes from "./routes/Admin_editActivityRoutes.js";
import AdminUpdateEditActivityRoutes from "./routes/Admin_UpdateEditActivityRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


sequelize.authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Unable to connect to database:", error);
  });

app.use("/api", upcomingEventRoutes);
app.use("/api", upcomingEventWithSpecificIdRoutes);
app.use("/api", activityFetchWithBatchRoutes);
app.use("/api", activityFetchWithSpecificBatchRoutes);
app.use("/api", activityFetchWithSpecificEventRoutes);
app.use("/api", associationAllBatchRoutes);
app.use("/api", associationSpecificBatchRoutes);
app.use("/api", gloriesRoutes);
app.use("/api", otpsendRoutes);
app.use("/api", otpverifyRoutes); 
app.use("/api", ProblemCreationRequestRoutes);
app.use("/api", currentProblemsRoutes);
app.use("/api", SpecificCurrentProblemRoutes);
app.use("/api", AddProblemSolverRequestRoutes);
app.use("/api", suggestionRoutes);
app.use("/api", Admin_addCelebrationRoute);
app.use("/api", Admin_addEventRouter);
app.use("/api", AdminAnnouncementFetchRoutes);
app.use("/api", AdminFetchSpecificRoutes);
app.use("/api", AdminEditRoutes);
app.use("/api", AdminDeleteRoutes);
app.use("/api", AdminActivityBatchesRoutes);
app.use("/api", AdminActivitySpecificBatchRoutes);
app.use("/api", AdminAddActivityRoutes);
app.use("/api", AdminEditActivityRoutes);
app.use("/api", AdminUpdateEditActivityRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});