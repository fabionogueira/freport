var report = new freport.FReport(document.querySelector('#report-container'));
report.definition(report2.definition);
report.draw(report2.data);