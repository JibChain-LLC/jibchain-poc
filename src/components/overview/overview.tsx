import OverviewAnalysisComponent from './overview-analysis-component';
import OverviewCardComponent from './overview-card-component';
import OverviewSummaryComponent from './overview-summary-component';

export default function OverviewComponent() {
  return (
    <div className='overflow-y-hidden'>
      <OverviewCardComponent />
      <OverviewSummaryComponent />
      <OverviewAnalysisComponent />
    </div>
  );
}
