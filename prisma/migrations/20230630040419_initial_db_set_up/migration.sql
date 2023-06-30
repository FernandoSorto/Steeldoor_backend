BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Job] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    [location] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [salaryRoof] DECIMAL(10,2) NOT NULL,
    [salaryBottom] DECIMAL(10,2) NOT NULL,
    [companyId] INT NOT NULL,
    CONSTRAINT [Job_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Skill] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Skill_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[SkillsOnJobs] (
    [jobId] INT NOT NULL,
    [skillId] INT NOT NULL,
    CONSTRAINT [SkillsOnJobs_pkey] PRIMARY KEY CLUSTERED ([jobId],[skillId])
);

-- CreateTable
CREATE TABLE [dbo].[JobApplication] (
    [id] INT NOT NULL IDENTITY(1,1),
    [applicantId] INT NOT NULL,
    CONSTRAINT [JobApplication_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Job] ADD CONSTRAINT [Job_companyId_fkey] FOREIGN KEY ([companyId]) REFERENCES [dbo].[Company]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[SkillsOnJobs] ADD CONSTRAINT [SkillsOnJobs_jobId_fkey] FOREIGN KEY ([jobId]) REFERENCES [dbo].[Job]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[SkillsOnJobs] ADD CONSTRAINT [SkillsOnJobs_skillId_fkey] FOREIGN KEY ([skillId]) REFERENCES [dbo].[Skill]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[JobApplication] ADD CONSTRAINT [JobApplication_applicantId_fkey] FOREIGN KEY ([applicantId]) REFERENCES [dbo].[Applicant]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
