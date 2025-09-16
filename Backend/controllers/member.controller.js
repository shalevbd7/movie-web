// Controller functions for handling member-related requests.
import * as memberService from "../service/member.service.js";

// Handles fetching all members from the database.
export async function getAllMembers(req, res) {
  try {
    const result = await memberService.getAllMembers();
    res.status(200).json(result);
  } catch (error) {
    console.log("Error in getAllMembers controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
// Handles fetching a single member by their ID.
export async function getMemberById(req, res) {
  try {
    const { id } = req.params;
    const result = await memberService.getMemberbyId(id);

    if (!result.success) {
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log("Error in getMemberById controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

// Handles finding members based on the city query parameter.
export async function findMemberByCity(req, res) {
  try {
    const { city } = req.query;
    const result = await memberService.findMemberByCity(city);

    if (!result.success && result.statusCode) {
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log("Error in findMemberByCity controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

// Handles the creation of a new member.
export async function createMember(req, res) {
  try {
    const result = await memberService.createMember(req.body);

    if (!result.success) {
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
      });
    }
    res.status(result.statusCode).json(result);
  } catch (error) {
    console.log("Error in createMember controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

// Handles updating an existing member's information.
export async function updateMember(req, res) {
  try {
    const { id } = req.params;
    const result = await memberService.updateMember(id, req.body);

    if (!result.success) {
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
      });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log("Error in updateMember controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

// Handles deleting a member from the database.
export async function deleteMember(req, res) {
  try {
    const { id } = req.params;
    const result = await memberService.deleteMember(id);

    if (!result.success) {
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log("Error in deleteMember controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
