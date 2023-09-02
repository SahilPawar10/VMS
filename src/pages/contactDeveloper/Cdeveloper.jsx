// import React from "react";

// const Cdeveloper = () => {

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Cdeveloper() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const css = {
    "& .css-ahj2mt-MuiTypography-root": {
      color: "blue",
    },
    "& .css-1pnmrwp-MuiTypography-root": {
      color: "blue",
    },
  };
  return (
    <div
      className="container mt-5 col-md-10   main_faq"
      style={{ fontFamily: "sans-serif" }}
    >
      <Accordion
        className="main_faq"
        sx={css}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="main_faq" />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            <b>VMS</b>
          </Typography>
          <Typography sx={{ color: "text.secondary" }} className="main_faq">
            What is VMS application..?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="main_faq">
            A Visitor Management System (VMS) is a software application designed
            to streamline and enhance the process of managing visitors to a
            specific location, such as an office building, campus, or facility.
            Here's a description of the typical usage and benefits of a Visitor
            Management System:
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        className="main_faq"
        sx={css}
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="main_faq" />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            <b> 1. Visitor Registration:</b>
          </Typography>
          How to Add Visits..?
          <Typography
            sx={{ color: "text.secondary" }}
            className="main_faq"
          ></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="main_faq">
            When a visitor arrives at the premises, they are required to check
            in using the VMS. They may need to provide their name, contact
            details, the purpose of their visit, and the name of the person they
            are meeting. In some cases, visitors can pre-register online, making
            the check-in process even more efficient and secure.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={css}
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        className="main_faq"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="main_faq" />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            <b>2:Host Notification:</b>
          </Typography>
          <Typography sx={{ color: "text.secondary" }} className="main_faq">
            The VMS notifies the host (employee or resident) about their
            visitor's arrival through various means like email, SMS, or app
            notifications.
          </Typography>
        </AccordionSummary>

        {/* panel 15 */}
      </Accordion>
      <Accordion
        sx={css}
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        className="main_faq"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="main_faq" />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            <b> 3:Access Control Integration:</b>
          </Typography>
          <Typography sx={{ color: "text.secondary" }} className="main_faq">
            In some cases, VMSs are integrated with access control systems,
            allowing the automatic unlocking of doors or gates for approved
            visitors.
          </Typography>
        </AccordionSummary>
      </Accordion>
      <Accordion
        sx={css}
        expanded={expanded === "panel5"}
        className="main_faq"
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="main_faq" />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            <b> 4:Reporting and Analytics:</b>
          </Typography>
          <Typography sx={{ color: "text.secondary" }} className="main_faq">
            VMSs can generate reports on visitor data, including the number of
            visitors, their purpose of visit, and their entry and exit times.
            This information can be useful for security audits and compliance.
          </Typography>
        </AccordionSummary>
      </Accordion>
      <Accordion
        className="main_faq"
        sx={css}
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="main_faq" />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            <b> 5: Visitor Tracking:</b>
          </Typography>
          <Typography sx={{ color: "text.secondary" }} className="main_faq">
            The system tracks the visitor's movements within the premises,
            including check-out times.
          </Typography>
        </AccordionSummary>
      </Accordion>
      {/*          panel 16 */}

      <Accordion
        className="main_faq"
        sx={css}
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="main_faq" />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            <b> 6: Customization & Enhanced Efficiency:</b>
          </Typography>
          <Typography sx={{ color: "text.secondary" }} className="main_faq">
            VMSs are often customizable to suit the specific needs of different
            organizations and industries.VMSs reduce the administrative burden
            of managing visitors manually, leading to increased operational
            efficiency.
          </Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  );
}
