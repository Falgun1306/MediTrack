import familyMember from "../models/FamilyMember.model.js";
import Medicine from "../models/medicine.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";

//below function is system triggered function so it will called by schedulers and services
// const medicinesWithStock = (medicines) => {
//     return medicines.map((medicine) => {
//         const stock = calculateRemainingStock({
//             startDate: medicine.startDate,
//             dosePerDay: medicine.dosePerDay,
//             totalQuantity: medicine.totalQuantity,
//         });

//         return {
//             ...medicine.toObject(),
//             remaining: stock.remaining,
//             daysPassed: stock.daysPassed,
//             consumed: stock.consumed,
//         };
//     });
// };

export const addMedicine = asyncHandler(async (req, res, next) => {
    const {
        familyMemberId,
        memberName,
        medicineName,
        dosePerDay,
        doseUnit,
        totalQuantity,
        // startDate,
        alertBeforeDays,
    } = req.body;
    
    const startDate = new Date();
    if (
        !familyMemberId ||
        !memberName ||
        !medicineName ||
        !dosePerDay ||
        !doseUnit ||
        !totalQuantity ||
        !startDate
    ) {
        return next(new errorHandler("All fields are required", 400));
    }

    const remainingStock = totalQuantity;

    const member = await familyMember.findOne({
        _id: familyMemberId,
        userId: req.user._id,
    });

    if (!member) {
        return next(new errorHandler("Member does not exist", 404));
    }

    const totalDays = Math.ceil(totalQuantity / dosePerDay);
    const calculatedEndDate = new Date(startDate);
    calculatedEndDate.setDate(calculatedEndDate.getDate() + totalDays);

    const medicine = await Medicine.create({
        userId: req.user._id,
        familyMemberId,
        memberName,
        medicineName,
        dosePerDay,
        doseUnit,
        totalQuantity,
        remainingStock,
        startDate,
        endDate: calculatedEndDate,
        alertBeforeDays: alertBeforeDays || 5,
        status: 'active',
    });

    res.status(201).json({
        success: true,
        message: 'Medicine added successfully',
        data: medicine,
    });
});

export const getAllMedicines = asyncHandler(async (req, res, next) => {

    const medicines = await Medicine.find({
        userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        data: medicines,
    });
});

export const getMedicineByFamilyMember = asyncHandler(async (req, res, next) => {
    const { familyMemberId } = req.params;

    const FamilyMember = await familyMember.findOne({
        _id: familyMemberId,
        userId: req.user._id,
    });

    if (!FamilyMember) {
        return res.status(404).json({
            success: false,
            message: 'Family member not found',
        });
    }

    const medicines = await Medicine.find({
        userId: req.user._id,
        familyMemberId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        count: medicines.length,
        data: medicines,
    });

});

export const updateMedicine = asyncHandler(async (req, res, next) => {
    const { medicineId } = req.params;
    const userId = req.user._id;

    const medicine = await Medicine.findOne({
        _id: medicineId,
        userId,
    });

    if (!medicine) {
        return next(new errorHandler('Medicine does not exist', 404));
    }

    req.body.familyMemberId = medicine.familyMemberId;

    const { dosePerDay, totalQuantity, startDate } = req.body;

    if (dosePerDay || totalQuantity || startDate) {
        const finalDose = dosePerDay || medicine.dosePerDay;
        const finalQuantity = totalQuantity || medicine.totalQuantity;
        const finalStartDate = startDate || medicine.startDate;

        const totalDays = Math.ceil(finalQuantity / finalDose);
        const newEndDate = new Date(finalStartDate);
        newEndDate.setDate(newEndDate.getDate() + totalDays);

        req.body.endDate = newEndDate;
    }

    const updatedMedicine = await Medicine.findByIdAndUpdate(
        medicineId,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        success: true,
        medicine: updatedMedicine,
    });
});

export const stopMedicine = asyncHandler(async (req, res, next) => {
    const { medicineId } = req.params;
    const userId = req.user._id;

    const medicine = await Medicine.findOne({
        _id: medicineId,
        userId,
    });

    if (!medicine) {
        return next(new errorHandler('Medicine does not exist', 404));
    }

    const stoppedMedicine = await Medicine.findByIdAndUpdate(
        medicineId,
        { status: 'stopped' },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        success: true,
        message: 'Medicine stopped successfully',
        medicine: stoppedMedicine,
    });
});

export const deleteMedicine = asyncHandler(async (req, res, next) => {
    const { medicineId } = req.params;
    const userId = req.user._id;

    const medicine = await Medicine.findOne({
        _id: medicineId,
        userId,
    });

    if (!medicine) {
        return next(new errorHandler('Medicine does not exist', 404));
    }

    await Medicine.findByIdAndDelete(medicineId);

    res.status(200).json({
        success: true,
        message: 'Medicine deleted successfully',
    });
});