
import { Escort } from "@/data/escortData";

interface RatesTabProps {
  escort: Escort;
}

const RatesTab = ({ escort }: RatesTabProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Rates</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-secondary/20 p-4 rounded-md">
          <h4 className="font-medium mb-2">1 Hour</h4>
          <p className="text-2xl font-bold text-lucoin">{escort.rates?.hourly || escort.price} LC</p>
        </div>
        
        {escort.rates?.twoHours && (
          <div className="bg-secondary/20 p-4 rounded-md">
            <h4 className="font-medium mb-2">2 Hours</h4>
            <p className="text-2xl font-bold text-lucoin">{escort.rates.twoHours} LC</p>
          </div>
        )}
        
        {escort.rates?.overnight && (
          <div className="bg-secondary/20 p-4 rounded-md">
            <h4 className="font-medium mb-2">Overnight</h4>
            <p className="text-2xl font-bold text-lucoin">{escort.rates.overnight} LC</p>
          </div>
        )}
        
        {escort.rates?.weekend && (
          <div className="bg-secondary/20 p-4 rounded-md">
            <h4 className="font-medium mb-2">Weekend</h4>
            <p className="text-2xl font-bold text-lucoin">{escort.rates.weekend} LC</p>
          </div>
        )}
      </div>
      
      <div className="mt-6 p-4 border border-dashed border-gray-600 rounded-md">
        <h4 className="font-semibold mb-2">Payment Methods</h4>
        <p className="text-sm text-gray-300">Cash, LuCoin, and major credit cards accepted. Payment must be made at the beginning of our meeting.</p>
      </div>
    </div>
  );
};

export default RatesTab;
