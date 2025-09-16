// This file contains the service layer logic for managing member data.
import * as memberRepository from "../repository/member.repository.js";

export const getAllMembers = async () => {
  const members = await memberRepository.getAllMembers();
  return {
    success: true,
    count: members.length,
    members: members,
    message: "Members retrived successfully",
  };
};

export const getMemberbyId = async (id) => {
  if (!memberRepository.isValidObjectId(id)) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid member ID format",
    };
  }
  const member = await memberRepository.getMemberById(id);
  if (!member) {
    return {
      success: false,
      statusCode: 404,
      message: "Member not found",
    };
  }

  return {
    success: true,
    member: member,
    message: "Member retrived successfully",
  };
};

export const findMemberByCity = async (city) => {
  if (!city) {
    return {
      success: false,
      statusCode: 400,
      message: "Member city is required",
    };
  }

  const members = await memberRepository.findMemberByCity(city);

  return {
    success: true,
    count: members.length,
    members: members,
    message:
      members.length > 0
        ? `${members.length} Members found successfully`
        : "No members found",
  };
};

export const createMember = async (memberData) => {
  const { fullName, email, city } = memberData;

  if (!fullName || !email || !city) {
    return {
      success: false,
      statusCode: 400,
      message: "All fields are required",
    };
  }

  const existingMember = await memberRepository.findMemberByExactEmail(email);
  if (existingMember) {
    return {
      success: false,
      statusCode: 400,
      message: "Member is already exists",
    };
  }

  const newMember = await memberRepository.createMember({
    fullName,
    email,
    city,
  });

  return {
    success: true,
    statusCode: 201,
    member: newMember,
    message: "Member created successfully",
  };
};

export const updateMember = async (id, memberData) => {
  if (!memberRepository.isValidObjectId(id)) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid member ID format",
    };
  }

  const { fullName, email, city } = memberData;
  const updatedData = {};

  if (fullName) updatedData.fullName = fullName;
  if (email) updatedData.email = email;
  if (city) updatedData.city = city;

  const updatedMember = await memberRepository.updateMemberById(
    id,
    updatedData
  );
  if (!updatedMember) {
    return {
      success: false,
      statusCode: 404,
      message: "Member not found",
    };
  }

  return {
    success: true,
    member: updatedMember,
    message: "Member updated successfully",
  };
};

export const deleteMember = async (id) => {
  if (!memberRepository.isValidObjectId(id)) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid member ID format",
    };
  }

  const deletedMember = await memberRepository.deleteMember(id);

  if (!deletedMember) {
    return {
      success: false,
      statusCode: 404,
      message: "Member not found",
    };
  }

  return {
    success: true,
    message: "Member deleted successfully",
    member: deletedMember,
  };
};
