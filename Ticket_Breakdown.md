# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

-   Data is saved in the database in the Facilities, Agents, and Shifts tables
-   A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
-   A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Based on my understanding to the description above, I assume the following flow:

-   Shifts are created by facilities.
-   Then, the staffing company assigns an agent to each shift.

Here is the task breakdown based on the above assumption:

### Allow facilities to manage their custom ids for each Agent they work with:
#### [Acceptance Criteria] as a facility representative, I can set custom id for each agent I work with by going to my agents page, selecting an agent and setting his custom id.

1. Create a new API to query agent custom ids by facility id (ETA: 2h).

-   create a new table `FacilityAgents` to define custom mapping between facilities and agents. it should contain the following fields: facility_id, agent_id, and facility_custom_agent_id (last is the custom id for the agent per facility).
-   define an endpoint to return all mappings from `FacilityAgents` given facility_id.
-   Request: `GET /facility-agents/:facility_id`
-   Response: agent_id, facility_custom_agent_id, agent_name (lookup from `Agents` table).

2. Create a new API to set agent custom id for a specific facility (ETA: 1h).

-   Request:
    `PATCH /facility-agents/:facility_id
{
  agent_id: "internal agent id",
  facility_custom_agent_id: "custom agent id for this facility"
}`

-   Response: OK or error
- This is depdendent on task 1.

3. Create a new page for facilities to manage their custom ids for each agent they work with (ETA: 3h).

-   This page will allow facilities to select an agent from a list of agents fetched using the first API descibed above and set his custom id by calling the second API. I assume the UI design is beyond the scope of this task.
- This is depdendent on task 1 and 2.

### Update facilities report to include custom agent id:
#### [Acceptance Criteria] when generating a facility report, custom agent id should be included in the report.

4. Update `getShiftsByFacility` to attach facility_custom_agent_id to each shift returned by this API (ETA: 1h).
- For each shift returned by this API, lookup facility_custom_agent_id from FacilityAgents by facility_id and internal agent_id and attach it to the returned shift.
- This is depdendent on task 1.
5. Update `generateReport` to include facility_custom_agent_id in report template (ETA: 1h).
- Now since we have facility_custom_agent_id set for each shift returned by getShiftsByFacility, we can add it to the generated report.
- This is depdendent on task 4.
