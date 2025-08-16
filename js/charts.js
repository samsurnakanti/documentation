function renderPreviewPlotly(plotlyType, data = null, chartName = "", labelField = null, targetId = "chart-preview") {
  const preview = document.getElementById(targetId);
  if (!preview) {
    console.error(`Chart container with ID '${targetId}' not found.`);
    return;
  }

  preview.innerHTML = `<div style="height:350px;" id="${targetId}-plot"></div>`;
  const color = document.getElementById('chart-color')?.value || '#1f77b4';

  const layout = {
    title: chartName || 'Preview Chart',
    margin: { t: 40, b: 40 },
    paper_bgcolor: '#f9f9f9',
    plot_bgcolor: '#fff',
    font: { size: 12 },
  };

  let plotData = [];

  if (!data || data.length === 0) {
    preview.innerHTML = "<p class='text-muted'>No data available for chart.</p>";
    return;
  }

  const keys = Object.keys(data[0]);
  const xKey = labelField || keys[0];
  const yKey = keys[1] || keys[0];

  if (plotlyType === "bar") {
    plotData = [{
      type: "bar",
      x: data.map(d => d[xKey]),
      y: data.map(d => d[yKey]),
      marker: { color: color },
    }];
  } else if (plotlyType === "line") {
    plotData = [{
      type: "scatter",
      mode: "lines+markers",
      x: data.map(d => d[xKey]),
      y: data.map(d => d[yKey]),
      marker: { color: color },
    }];
  } else if (plotlyType === "pie") {
    plotData = [{
      type: "pie",
      labels: data.map(d => d[xKey]),
      values: data.map(d => d[yKey]),
    }];
  } else {
    preview.innerHTML = "<p class='text-warning'>Unsupported chart type selected.</p>";
    return;
  }

  Plotly.newPlot(`${targetId}-plot`, plotData, layout, { responsive: true });
}
