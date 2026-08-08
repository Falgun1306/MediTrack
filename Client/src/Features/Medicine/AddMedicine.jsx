import { useState } from "react";
import useMedicineStore from "../../Store/Medicine.store.js";
import { axiosInstance } from "../../utilities/axiosInstance.js";
import { toast } from "react-toastify";

const AddMedicine = () => {
  const setShowAddMedicine = useMedicineStore(
    (state) => state.setShowAddMedicine
  );
  const memberId = useMedicineStore(
    (state) => state.memberIdForMedicine
  );
  const fetchMedicines = useMedicineStore(
    (state) => state.fetchMedicines
  );
  const fetchAllMedicine = useMedicineStore(
    (state) => state.fetchAllMedicines
  );
  const memberName = useMedicineStore(
    (state) => state.memberNameForMedicine
  );

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [medicineData, setMedicineData] = useState({
    familyMemberId: memberId,
    memberName: memberName,
    medicineName: "",
    doseAtime: "",
    NumberOfDose: "",
    doseUnit: "",
    totalQuantity: "",
    alertBeforeDays: "",
  });

  const [doseTimes, setDoseTimes] = useState([]);

  const handleInputChange = (e) => {
    setMedicineData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    const numDoses = parseInt(medicineData.NumberOfDose);

    if (!medicineData.medicineName || !numDoses || !medicineData.doseUnit || !medicineData.totalQuantity) {
      return toast.error("Please fill all fields before continuing");
    }

    if (numDoses < 1 || numDoses > 10) {
      return toast.error("Number of doses must be between 1 and 10");
    }

    const times = Array.from({ length: numDoses }, () => ({ time: "", period: "AM" }));
    setDoseTimes(times);
    setStep(2);
  };

  const handleTimeChange = (index, field, value) => {
    setDoseTimes(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddMedicine = async (e) => {
    e.preventDefault();

    const allFilled = doseTimes.every(dt => dt.time.trim() !== "");
    if (!allFilled) {
      return toast.error("Please enter all dose timings");
    }

    const formattedTimes = doseTimes.map(dt => `${dt.time} ${dt.period}`);
    const doseAtime = formattedTimes.join(", ");

    try {
      setLoading(true);

      const payload = {
        ...medicineData,
        doseAtime,
        dosePerDay: parseInt(medicineData.NumberOfDose),
      };

      const response = await axiosInstance.post(
        "/medicines",
        payload
      );

      toast.success(
        response.data.message || "Medicine added successfully"
      );

      await fetchMedicines(memberId);
      await fetchAllMedicine();

      setShowAddMedicine(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Check Medicine Details"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal-content animate-fadeInScale overflow-hidden pt-7" style={{ maxHeight: '90vh', overflowY: 'auto' }}>

        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-2 bg-[#00607e]"></div>

        {/* Close Button */}
        <button
          onClick={() => setShowAddMedicine(false)}
          className="close-btn"
        >
          ✕
        </button>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className={`flex items-center gap-2 text-xs font-semibold ${step === 1 ? 'text-[#00607e]' : 'text-[#6f787e]'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 1 
                ? 'bg-[#00607e] text-white' 
                : 'bg-[#eef8ff] text-[#00607e]'
            }`}>
              {step > 1 ? '✓' : '1'}
            </span>
            Details
          </div>
          <div className="w-8 h-px bg-[#bec8ce]"></div>
          <div className={`flex items-center gap-2 text-xs font-semibold ${step === 2 ? 'text-[#00607e]' : 'text-[#6f787e]'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 2 
                ? 'bg-[#00607e] text-white' 
                : 'bg-[#f0f3ff] text-[#6f787e]'
            }`}>2</span>
            Timings
          </div>
        </div>

        {/* Step 1: Medicine Details */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold font-headline text-center text-[#111c2d] mb-6">
              Add Medication
            </h2>

            <form onSubmit={handleNextStep} className="space-y-4">
              {/* Medicine Name */}
              <div>
                <label className="block text-xs font-semibold text-[#3f484d] mb-1.5 uppercase tracking-wider">Medicine Name</label>
                <input
                  type="text"
                  name="medicineName"
                  placeholder="e.g. Paracetamol 500mg"
                  value={medicineData.medicineName}
                  onChange={handleInputChange}
                  className="input-stitch"
                />
              </div>

              {/* Number of Doses */}
              <div>
                <label className="block text-xs font-semibold text-[#3f484d] mb-1.5 uppercase tracking-wider">Doses Per Day</label>
                <input
                  type="number"
                  name="NumberOfDose"
                  placeholder="e.g. 3"
                  min="1"
                  max="10"
                  value={medicineData.NumberOfDose}
                  onChange={handleInputChange}
                  className="input-stitch"
                />
              </div>

              {/* Dose Unit */}
              <div>
                <label className="block text-xs font-semibold text-[#3f484d] mb-1.5 uppercase tracking-wider">Dose Unit</label>
                <select
                  name="doseUnit"
                  value={medicineData.doseUnit}
                  onChange={handleInputChange}
                  className="input-stitch"
                >
                  <option value="">Select Dose Unit</option>
                  <option value="mg">mg</option>
                  <option value="ml">ml</option>
                  <option value="tablet">tablet</option>
                  <option value="capsule">capsule</option>
                </select>
              </div>

              {/* Total Quantity */}
              <div>
                <label className="block text-xs font-semibold text-[#3f484d] mb-1.5 uppercase tracking-wider">Total Quantity</label>
                <input
                  type="number"
                  name="totalQuantity"
                  placeholder="e.g. 30"
                  value={medicineData.totalQuantity}
                  onChange={handleInputChange}
                  className="input-stitch"
                />
              </div>

              {/* Alert Before Days */}
              <div>
                <label className="block text-xs font-semibold text-[#3f484d] mb-1.5 uppercase tracking-wider">Refill Alert (Days in advance)</label>
                <input
                  type="number"
                  name="alertBeforeDays"
                  placeholder="e.g. 5"
                  value={medicineData.alertBeforeDays}
                  onChange={handleInputChange}
                  className="input-stitch"
                />
              </div>

              {/* Next Button */}
              <button
                type="submit"
                className="btn-primary w-full py-3 rounded-xl text-sm font-semibold tracking-wide mt-2"
              >
                Next: Set Timings →
              </button>
            </form>
          </>
        )}

        {/* Step 2: Dose Timings */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-bold font-headline text-center text-[#111c2d] mb-2">
              Set Dose Timings
            </h2>
            <p className="text-xs text-[#3f484d] text-center mb-6">
              Enter timing for each dose of <span className="text-[#00607e] font-semibold">{medicineData.medicineName}</span>
            </p>

            <form onSubmit={handleAddMedicine} className="space-y-4">
              {doseTimes.map((dt, index) => (
                <div key={index} className="list-card p-3.5">
                  <label className="block text-xs font-semibold text-[#3f484d] mb-2 uppercase tracking-wider">
                    Dose {index + 1} Schedule
                  </label>
                  <div className="flex gap-2.5">
                    <input
                      type="text"
                      placeholder="e.g. 08:00"
                      value={dt.time}
                      onChange={(e) => handleTimeChange(index, 'time', e.target.value)}
                      className="input-stitch flex-1"
                      pattern="[0-9]{1,2}:[0-9]{2}"
                      title="Enter time in HH:MM format"
                    />
                    <select
                      value={dt.period}
                      onChange={(e) => handleTimeChange(index, 'period', e.target.value)}
                      className="input-stitch"
                      style={{ width: '5.5rem', flexShrink: 0 }}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                {/* Back Button */}
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-ghost flex-1 py-3 rounded-xl text-sm font-medium"
                >
                  ← Back
                </button>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1 py-3 rounded-xl text-sm font-semibold tracking-wide disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Add Medication"}
                </button>
              </div>
            </form>
          </>
        )}

      </div>
    </div>
  );
};

export default AddMedicine;
