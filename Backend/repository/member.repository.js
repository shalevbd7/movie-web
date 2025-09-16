// This file contains a service layer for handling Member-related database operations.
import { Member } from "../models/member.model.js";

export const getAllMembers = async () => {
  return await Member.find({});
};

export const getMemberById = async (id) => {
  return await Member.findById(id);
};

export const findMemberByCity = async (city) => {
  return await Member.find({
    city: { $regex: city, $options: "i" },
  });
};

export const findMemberByExactEmail = async (email) => {
  return await Member.findOne({ email: email });
};

export const createMember = async (memberData) => {
  const newMember = new Member(memberData);
  return await newMember.save();
};

export const updateMemberById = async (id, updateData) => {
  return await Member.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteMember = async (id) => {
  return await Member.findByIdAndDelete(id);
};

export const isValidObjectId = (id) => {
  return id.match(/^[0-9a-fA-F]{24}$/);
};
