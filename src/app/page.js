"use client";

import "./globals.css";
import React, { useState, useEffect, useCallback } from "react";
import "./page.scss";
import TextField from "@mui/material/TextField";
import MultipleSelect from "@/components/MultiSelectDropDown/MultiSelectDropDown";
import JobCard from "@/components/JobCard/JobCard";
import axios from "axios";
import Box from "@mui/material/Box";
import JobsNotFound from "@/components/JobsNotFound/JobsNotFound";

const roles = [
  "Frontend",
  "Backend",
  "Full Stack",
  "IOS",
  "Flutter",
  "React Native",
  "Android",
  "Data Science",
  "Machine Learning",
  "Dev-ops",
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

const experience = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [selectedJobType, setSelectedJobType] = useState([]);
  const [selectedMinBasePaySalary, setSelectedMinBasePaySalary] = useState([]);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");

  const [jobs, setJobs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [filter, setFilter] = useState({});
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobsFound, setJobsFound] = useState(true);

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
        setFilteredJobs((prevJobs) => [...prevJobs, ...response.data.jdList]);
        setOffset((offset) => offset + 10);
        setFetching(false);
        setJobsFound(true);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setFetching(false);
      });
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    function handleScroll() {
      const lastCard = document.querySelector(".jobCard:last-child");
      if (lastCard) {
        const lastCardOffset = lastCard.offsetTop + lastCard.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight;
        if (pageOffset > lastCardOffset && !fetching) {
          fetchJobs();
        }
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const filter = {
      roles: selectedRoles,
      numberOfEmployees: selectedNumberOfEmployees,
      experience: selectedExperience,
      jobType: selectedJobType,
      minBasePaySalary: selectedMinBasePaySalary,
      companyName: selectedCompanyName,
    };
    setFilter(filter);
  }, [
    selectedRoles,
    selectedNumberOfEmployees,
    selectedExperience,
    selectedJobType,
    selectedMinBasePaySalary,
    selectedCompanyName,
  ]);

  useEffect(() => {
    if (Object.keys(filter).length) {
      // Filter jobs on the frontend side
      const lowerCaseRoles = filter.roles.map((role) => role.toLowerCase());
      const minSalaryInNumbers = filter.minBasePaySalary.map((salary) =>
        parseInt(salary)
      );
      const locationsList = filter.jobType.map((location) =>
        location.toLowerCase()
      );

      const filteredJobsList = jobs.filter((job) => {
        const jobSalary = parseInt(job.minJdSalary);

        if (
          (lowerCaseRoles.length !== 0 &&
            !lowerCaseRoles.includes(job.jobRole.toLowerCase())) ||
          (filter.numberOfEmployees.length !== 0 &&
            (job.numberOfEmployees === null ||
              !filter.numberOfEmployees.includes(job.numberOfEmployees))) ||
          (filter.experience.length !== 0 &&
            (job.minExp === null ||
              !filter.experience.some(
                (minExp) => parseInt(job.minExp) <= minExp
              ))) ||
          (locationsList.length !== 0 &&
            (job.location === null || !locationsList.includes(job.location))) ||
          (minSalaryInNumbers.length !== 0 &&
            (job.minJdSalary === null ||
              !minSalaryInNumbers.some(
                (filterSalary) => jobSalary > filterSalary
              ))) ||
          (filter.companyName &&
            (job.companyName === null ||
              !job.companyName
                .toLowerCase()
                .includes(filter.companyName.toLowerCase())))
        ) {
          return false;
        }

        return true;
      });

      if (filteredJobsList.length === 0) {
        console.log("No jobs found");
        setJobsFound(false);
        setFilteredJobs([]);
      } else {
        setJobsFound(true);
        setFilteredJobs(filteredJobsList);
      }

      console.log(filteredJobsList);
    }
  }, [filter, jobs]);

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
            selectedItems={selectedExperience}
            setSelectedItems={setSelectedExperience}
          />
          <MultipleSelect
            style={{ flex: 1 }}
            items={jobType}
            name="Job Type"
            selectedItems={selectedJobType}
            setSelectedItems={setSelectedJobType}
          />
          <MultipleSelect
            style={{ flex: 1 }}
            items={minBasePaySalary}
            name="Min Base Pay Salary"
            selectedItems={selectedMinBasePaySalary}
            setSelectedItems={setSelectedMinBasePaySalary}
          />
          <TextField
            style={{ flex: 1, padding: "0px 8px" }}
            id="companyName"
            label="Company Name"
            variant="outlined"
            value={selectedCompanyName}
            onChange={(e) => setSelectedCompanyName(e.target.value)}
          />
        </div>
      </div>
      {jobsFound ? (
        <Box className="jobCards">
          {filteredJobs.map((job) => (
            <JobCard key={job.jdUid + Math.random().toString()} job={job} />
          ))}
        </Box>
      ) : (
        <JobsNotFound />
      )}
    </div>
  );
}
