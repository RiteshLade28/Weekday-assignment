import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Box from "@mui/material/Box";
import "./JobCard.scss";
import Image from "next/image";

export default function JobCard() {
  return (
    <Box className="jobCard">
      <Box className="cardHeader">
        <Box className="cardLogo">
          <Image
            src="/fampayLogo.jpg"
            alt="FamPay Logo"
            width={50}
            height={50}
          />
        </Box>
        <Box className="cardDetails">
          <Typography variant="subtitle1" component="div">
            fampay
          </Typography>
          <Typography variant="h6" component="div">
            Backend Engineer
          </Typography>
          <Typography variant="body2" component="div">
            Location
          </Typography>
        </Box>
      </Box>
      <Box className="cardContent">
        <Typography variant="body2" component="div">
          Estimated Salary
        </Typography>
        <Typography variant="body2" component="div">
          About Company
        </Typography>
        <Typography variant="body2" component="div">
          FamPay is building India’s first neo-bank exclusively teens. FamPay
          helps teens make their own online and offline payments through UPI,
          FamPay App and FamCard. Our aim is to make banking cool for teens and
          to help them learn the value of money, savings and spending wisely. We
          are on a mission to raise a new, financially aware generation, and
          drive 250 Million+ Indian teenagers to kickstart their financial
          journey super early in their life. Founded in 2019 by IIT Roorkee
          alumni, FamPay is backed by some of the most respected investors
          around the world like Elevation Capital, Y-Combinator, Sequoia Capital
          India, Venture Highway, Global Founder’s Capital and the likes of
          Kunal Shah, Amrish Rao as angels.
        </Typography>
      </Box>
    </Box>
  );
}
