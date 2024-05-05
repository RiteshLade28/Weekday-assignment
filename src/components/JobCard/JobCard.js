import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Box from "@mui/material/Box";
import "./JobCard.scss";
import Image from "next/image";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { Button } from "@mui/material";

export default function JobCard({ job }) {
  return (
    <Box className="jobCard">
      <Box className="cardHeader">
        <Box className="cardCreated">
          <HourglassTopIcon fontSize="small" style={{ color: "orange" }} />
          <Typography variant="body2" component="div">
            Posted 10 days ago
          </Typography>
        </Box>
        <Box className="cardInfo">
          <Box className="cardLogo">
            <img src={job.logoUrl} alt="Company Logo" width={50} height={50} />
          </Box>
          <Box className="cardDetails">
            <Typography
              fontWeight="bold"
              color="#504e4e"
              variant="subtitle1"
              component="div"
            >
              {job.companyName}
            </Typography>
            <Typography
              variant="h6"
              component="div"
              style={{ textTransform: "capitalize" }}
            >
              {job.jobRole}
            </Typography>
            <Typography
              style={{
                fontWeight: "bold",
                color: "#504e4e",
                textTransform: "capitalize",
              }}
              variant="body2"
              component="div"
            >
              {job.location ? job.location : "Not mentioned"}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="cardContent">
        <Box className="cardDescription">
          <Typography
            style={{ fontWeight: "550", color: "#504e4e" }}
            variant="subtitle1"
            component="div"
          >
            Estimated Salary:{" "}
            {job.minJdSalary || job.maxJdSalary ? (
              <>
                ₹{job.minJdSalary} {job.minJdSalary ? "- " : ""}
                {job.maxJdSalary} LPA ✅
              </>
            ) : (
              <>Not mentioned</>
            )}
          </Typography>
          <Typography
            style={{ fontWeight: "550", color: "#504e4d" }}
            variant="h6"
            component="div"
          >
            About Company
          </Typography>
          <Typography variant="body1" component="div">
            <Typography
              style={{ fontWeight: "600", color: "#504e4d" }}
              variant="body1"
              component="div"
            >
              About Us
            </Typography>
            {job.jobDetailsFromCompany}
          </Typography>
        </Box>
        <Box
          className="viewMoreButton"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            position: "absolute",
            bottom: "5px",
            width: "100%",
            height: "50%",
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))",
          }}
        >
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              color: "blue",
            }}
          >
            View More
          </button>
        </Box>
      </Box>
      <Box style={{ marginTop: "10px" }}>
        <Typography
          style={{ fontWeight: "600", color: "#504e4d" }}
          variant="body1"
          component="div"
        >
          Minimum Experience
        </Typography>
        <Typography variant="body1" component="div">
          {job.minExp ? job.minExp + " years" : "Not mentioned"}
        </Typography>
        <Box className="cardFooter">
          <Button
            style={{
              backgroundColor: "#55EFC4",
              color: "black",
              fontWeight: "bold",
            }}
            variant="contained"
            color="primary"
          >
            ⚡ Easy Apply
          </Button>
          <Button
            style={{ backgroundColor: "#10439F" }}
            variant="contained"
            color="primary"
          >
            Unlock Referrel Ask
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
