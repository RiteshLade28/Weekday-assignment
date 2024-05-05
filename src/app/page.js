"use client";

import "./globals.css";
import React, { useState, useEffect, useCallback } from "react";
import "./page.scss";
import TextField from "@mui/material/TextField";
import MultipleSelect from "@/components/MultiSelectDropDown/MultiSelectDropDown";
import JobCard from "@/components/JobCard/JobCard";
import axios from "axios";
import Box from "@mui/material/Box";

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
  "Software Engineer",
  "System Engineer",
  "Network Engineer",
  "Security Engineer",
];

const numberOfEmployees = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1001-5000",
  "5001-10000",
  "10001+",
];

const jobType = ["Remote", "In Office", "Hybrid"];

const experience = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const minBasePaySalary = [
  "0L",
  "10L",
  "20L",
  "30L",
  "40L",
  "50L",
  "60L",
  "70L",
];

export default function Home() {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedNumberOfEmployees, setSelectedNumberOfEmployees] = useState(
    []
  );
  const [jobs, setJobs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [fetching, setFetching] = useState(false);

  const fetchJobs = useCallback(() => {
    setFetching(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      limit: 10,
      offset: offset,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    axios
      .post(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      )
      .then((response) => {
        console.log(response);
        setJobs((prevJobs) => [...prevJobs, ...response.data.jdList]);
        setOffset((prevOffset) => prevOffset + 10);
        setFetching(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setFetching(false);
      });
  }, [offset]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if (!fetching) {
          fetchJobs();
        }
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchJobs, fetching]);

  return (
    <div className="container">
      <div className="filterContainer">
        <div className="horizontalBar"></div>
        <div className="filter">
          <MultipleSelect
            style={{ flex: 1 }}
            items={roles}
            name="Roles"
            selectedItems={selectedRoles}
            setSelectedItems={setSelectedRoles}
          />
          <MultipleSelect
            style={{ flex: 1 }}
            items={numberOfEmployees}
            name="Number of Employees"
            selectedItems={selectedNumberOfEmployees}
            setSelectedItems={setSelectedNumberOfEmployees}
          />
          <MultipleSelect
            style={{ flex: 1 }}
            items={experience}
            name="Experience"
            selectedItems={selectedRoles}
            setSelectedItems={setSelectedRoles}
          />
          <MultipleSelect
            style={{ flex: 1 }}
            items={jobType}
            name="Job Type"
            selectedItems={selectedRoles}
            setSelectedItems={setSelectedRoles}
          />
          <MultipleSelect
            style={{ flex: 1 }}
            items={minBasePaySalary}
            name="Min Base Pay Salary"
            selectedItems={selectedRoles}
            setSelectedItems={setSelectedRoles}
          />
          <TextField
            style={{ flex: 1, padding: "0 8px" }}
            id="companyName"
            label="Company Name"
            variant="outlined"
          />
        </div>
      </div>
      <Box className="jobCards">
        {jobs.map((job) => (
          <JobCard key={job.jdUid} job={job} />
        ))}
      </Box>
    </div>
  );
}
