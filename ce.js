console.log('JS is working!')

// Calculate work estimate for clients

// VARIABLES

// Task complexity, dev reliability, dev estimate, current date, current time

// FORMULA

/*

Take dev estimate and add a buffer to it

The buffer should be greater if the task is more compelx and/or the dev is unreliable

The buffer should be less if the task is less complex and/or the dev is reliable

We should return both an hours estimate and a date of completion estimate

The date of completion estimate should factor in that we do not expect work to be done on weekends

*/

// Completion Estimate Calculator

function calculateCompletionEstimate(taskComplexity, devReliability, devEstimateHours, devEstimateDays) {
    const currentDate = new Date();
    let bufferMultiplier;

    if (taskComplexity === "high" && devReliability === "low") {
      bufferMultiplier = 1.5;
    } else if (taskComplexity === "high" && devReliability === "medium") {
      bufferMultiplier = 1.4;
    } else if (taskComplexity === "medium" && devReliability === "low") {
      bufferMultiplier = 1.3;
    } else if (taskComplexity === "medium" && devReliability === "medium") {
      bufferMultiplier = 1.2;
    } else if (taskComplexity === "low" && devReliability === "low") {
      bufferMultiplier = 1.2;
    } else {
      bufferMultiplier = 1.1;
    }

    const adjustedEstimateHours = Math.ceil(devEstimateHours * bufferMultiplier);
    const adjustedEstimateDays = Math.ceil(devEstimateDays * bufferMultiplier);

    let remainingDays = adjustedEstimateDays;
    let completionDate = new Date(currentDate);

    while (remainingDays > 0) {
      completionDate.setDate(completionDate.getDate() + 1);
      const dayOfWeek = completionDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        remainingDays -= 1;
      }
    }

    const formattedDate = `${completionDate.getDate().toString().padStart(2, '0')}/${(completionDate.getMonth() + 1).toString().padStart(2, '0')}/${completionDate.getFullYear()}`;

    return {
      hoursEstimate: adjustedEstimateHours,
      daysEstimate: adjustedEstimateDays,
      completionDate: formattedDate
    };
  }

  document.getElementById("calculateButton").addEventListener("click", () => {
    const taskComplexity = document.getElementById("taskComplexity").value;
    const devReliability = document.getElementById("devReliability").value;
    const devEstimateHours = parseFloat(document.getElementById("devEstimateHours").value);
    const devEstimateDays = parseFloat(document.getElementById("devEstimateDays").value);

    if (isNaN(devEstimateHours) || isNaN(devEstimateDays)) {
      document.getElementById("result").innerText = "Please enter valid numbers for hours and days.";
      return;
    }

    const result = calculateCompletionEstimate(taskComplexity, devReliability, devEstimateHours, devEstimateDays);

    document.getElementById("result").innerHTML = `
      <strong>Results:</strong><br>
      Estimated Hours: ${result.hoursEstimate}<br>
      Estimated Days: ${result.daysEstimate}<br>
      Completion Date: ${result.completionDate}
    `;
  });

