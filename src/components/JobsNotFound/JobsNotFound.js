import { Box, Typography } from "@mui/material";

const JobsNotFound = () => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
        width: "100%",
      }}
    >
      <img
        src="/jobsNotFound.webp"
        alt="No jobs found"
        style={{ width: "200px", height: "200px" }}
      />
      <Typography
        variant="h4"
        component="div"
        style={{ fontWeight: "bold", color: "#504e4e" }}
      >
        Sorry, we couldn't find any jobs for you
      </Typography>
      <Typography variant="h6" component="div" style={{ color: "#504e4e" }}>
        Try changing the filters
      </Typography>
    </Box>
  );
};

export default JobsNotFound;
