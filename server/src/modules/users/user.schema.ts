import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    firstName: z.string().min(3, "First name must be at least 3 characters long"),
    lastName: z.string().min(3, "Last name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    phone: z.string().min(10, "Phone number must be at least 10 digits long").optional(),
    address: z.string().min(3, "Address must be at least 3 characters long").optional(),
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),   
  })
});

export const changePasswordSchema = z.object({
  body: z.object({
    oldPassword: z.string().min(6, "Password must be at least 6 characters long"),
    newPassword: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters long"),
  })
});

export const updateUseSchema = z.object({
  body: z.object({
    firstName: z.string().min(3, "First name must be at least 3 characters long").optional(),
    lastName: z.string().min(3, "Last name must be at least 3 characters long").optional(),
    email: z.string().email("Invalid email address").optional(),
    phone: z.string().min(10, "Phone number must be at least 10 digits long").optional(),
    address: z.string().min(3, "Address must be at least 3 characters long").optional(),
    bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
    avatar: z.string().optional(),
  })
});

export const roleOfUserSchema = z.object({
  body: z.object({
    role: z.enum(["user","admin","super-admin","business-manager"]),
  }),
  params: z.object({
    id: z.string().min(1, "User ID is required"),
  })
});

export const deleteUserSchema = z.object({
  params: z.object({
    id: z.string().min(1, "User ID is required"),
  })
});

export const blockUserSchema = z.object({
  params: z.object({
    id: z.string().min(1, "User ID is required"),
  })
});


export const createuserServicebySuperAdminSchema = z.object({
    body: z.object({
        firstName: z.string().min(3, "First name must be at least 3 characters long"),
        lastName: z.string().min(3, "Last name must be at least 3 characters long"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters long"),
        phone: z.string().min(10, "Phone number must be at least 10 digits long").optional(),
        address: z.string().min(3, "Address must be at least 3 characters long").optional(),
        role: z.enum(["user","admin","super-admin","business-manager"]).optional(),
    })
});









