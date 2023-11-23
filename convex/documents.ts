import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

//Create document
export const create = mutation({
  //giving arguments
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },

  //handeling user and files
  handler: async (ctx, args) => {
    //geting user identity 
    const identity = await ctx.auth.getUserIdentity();

    //validating
    if (!identity) {
      throw new Error("Not authenticated");
    }

    //store the user identity
    const userId = identity.subject;

    //creating document
    const documents = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return documents;
  },
});

//getting document
export const get = query({
  args: {
    parentDocument: v.optional(v.id("documents")),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    //getting document through userId and filter then get that specific document
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (query) =>
        query.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      //this filter only show the document is not archived(deleted)
      .filter((query) => query.eq(query.field("isArchived"), false))
      .order("desc") //order by decending
      .collect();

    return documents;
  },
});

//deleting document
export const archive = mutation({
  args: {
    id: v.id("documents"),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    //getting existing document (attempt to get the parent document)
    const existingDocuments = await ctx.db.get(args.id);

    if (!existingDocuments) {
      throw new Error("Not found");
    }

    if (existingDocuments.userId !== userId) {
      throw new Error("unAuthenticated");
    }

    //delete that document
    const documents = await ctx.db.patch(args.id, {
      isArchived: true,
    });

    //deleting all the child of that document
    const recresiveArchie = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (query) =>
          query.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();

      //for-loop for continue this for all the children
      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: true,
        });

        //it will create a loop and continue this.
        //(check every single child and confirm arhived or not it will go at the end of the document childrens)
        await recresiveArchie(child._id);
      }
    };

    //it will get all the documents recresively
    recresiveArchie(args.id);

    return documents;
  },
});

//getting archive documents
export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    //getting archive document list
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (query) => query.eq("userId", userId))
      .filter((query) => query.eq(query.field("isArchived"), true)) //filter out only archive is true
      .order("desc") //order by decending
      .collect();

    return documents;
  },
});

//restore archived document
export const restore = mutation({
  args: { id: v.id("documents") },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    //getting existing documents
    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    //for parent exist or not in archive
    const options: Partial<Doc<"documents">> = {
      isArchived: false,
    };

    //checking parent document exist
    if (existingDocument.parentDocument) {
      const parent = await ctx.db.get(existingDocument.parentDocument); //if exist get
      //else give a option undefine
      if (parent?.isArchived) {
        options.parentDocument = undefined;
      }
    }

    //restore all the child of that document
    const recursiveRestore = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();

      //for-loop for continue this for all the children
      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: false,
        });

        //it will create a loop and continue this.
        //(check every single child and confirm restored or not it will go at the end of the document childrens)
        await recursiveRestore(child._id);
      }
    };

    //restoring archived documents
    const document = await ctx.db.patch(args.id, options);

    //it will get all the documents recresively
    recursiveRestore(args.id);

    return document;
  },
});

//delet the document permanently
export const remove = mutation({
  args: { id: v.id("documents") },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    //getting existing document
    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    //delete all the child of that document
    const recursiveDelete = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();

      //for-loop for continue this for all the children
      for (const child of children) {
        await ctx.db.delete(child._id);

        //it will create a loop and continue this.
        //(check every single child and confirm deleted or not it will go at the end of the document childrens)
        await recursiveDelete(child._id);
      }
    };

    //deleting that document
    const document = await ctx.db.delete(args.id);

    //it will get all the documents recresively
    recursiveDelete(args.id);

    return document;
  },
});
