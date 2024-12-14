function calculateCompletionEstimate(taskComplexity, devReliability, devEstimateHours, devEstimateDays, qaRequired) {
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

    if (qaRequired === "yes") {
      const qaBufferDays = 2; // Assume QA takes 2 additional days
      const qaBufferHours = Math.ceil(adjustedEstimateHours * 0.2); // QA takes 20% of dev hours

      let qaCompletionDate = new Date(completionDate);
      let remainingQaDays = qaBufferDays;

      while (remainingQaDays > 0) {
        qaCompletionDate.setDate(qaCompletionDate.getDate() + 1);
        const dayOfWeek = qaCompletionDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          remainingQaDays -= 1;
        }
      }

      const qaFormattedDate = `${qaCompletionDate.getDate().toString().padStart(2, '0')}/${(qaCompletionDate.getMonth() + 1).toString().padStart(2, '0')}/${qaCompletionDate.getFullYear()}`;

      return {
        devHoursEstimate: adjustedEstimateHours,
        qaHoursEstimate: qaBufferHours,
        totalHoursEstimate: adjustedEstimateHours + qaBufferHours,
        daysEstimate: adjustedEstimateDays,
        completionDate: formattedDate,
        qaCompletionDate: qaFormattedDate
      };
    }

    return {
      devHoursEstimate: adjustedEstimateHours,
      qaHoursEstimate: 0,
      totalHoursEstimate: adjustedEstimateHours,
      daysEstimate: adjustedEstimateDays,
      completionDate: formattedDate
    };
  }

  document.getElementById("calculateButton").addEventListener("click", () => {
    const taskComplexity = document.getElementById("taskComplexity").value;
    const devReliability = document.getElementById("devReliability").value;
    const devEstimateHours = parseFloat(document.getElementById("devEstimateHours").value);
    const devEstimateDays = parseFloat(document.getElementById("devEstimateDays").value);
    const qaRequired = document.getElementById("qaRequired").value;

    if (isNaN(devEstimateHours) || isNaN(devEstimateDays)) {
      document.getElementById("result").innerText = "Please enter valid numbers for hours and days.";
      return;
    }

    const result = calculateCompletionEstimate(taskComplexity, devReliability, devEstimateHours, devEstimateDays, qaRequired);

    if (qaRequired === "yes") {
      document.getElementById("result").innerHTML = `
        <strong>Results:</strong><br>
        Developer Estimated Hours: ${result.devHoursEstimate}<br>
        QA Estimated Hours: ${result.qaHoursEstimate}<br>
        Total Estimated Hours: ${result.totalHoursEstimate}<br>
        Estimated Days: ${result.daysEstimate}<br>
        Completion Date: ${result.completionDate}<br>
        QA Completion Date: ${result.qaCompletionDate}
      `;
    } else {
      document.getElementById("result").innerHTML = `
        <strong>Results:</strong><br>
        Developer Estimated Hours: ${result.devHoursEstimate}<br>
        Total Estimated Hours: ${result.totalHoursEstimate}<br>
        Estimated Days: ${result.daysEstimate}<br>
        Completion Date: ${result.completionDate}
      `;
    }
  });