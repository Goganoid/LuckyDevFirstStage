﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RecipeWiki.Data;

#nullable disable

namespace RecipeWiki.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("RecipeWiki.Entities.CustomMeal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Instructions")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("CustomMeals");
                });

            modelBuilder.Entity("RecipeWiki.Entities.Ingredient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("CustomMealId")
                        .HasColumnType("int");

                    b.Property<string>("IngredientInfoId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Measure")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CustomMealId");

                    b.HasIndex("UserId");

                    b.ToTable("Ingredients");
                });

            modelBuilder.Entity("RecipeWiki.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("SavedMealsIds")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("RecipeWiki.Entities.CustomMeal", b =>
                {
                    b.HasOne("RecipeWiki.Entities.User", "User")
                        .WithMany("UserMeals")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("RecipeWiki.Entities.Ingredient", b =>
                {
                    b.HasOne("RecipeWiki.Entities.CustomMeal", null)
                        .WithMany("Ingredients")
                        .HasForeignKey("CustomMealId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("RecipeWiki.Entities.User", null)
                        .WithMany("StoredIngredients")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("RecipeWiki.Entities.CustomMeal", b =>
                {
                    b.Navigation("Ingredients");
                });

            modelBuilder.Entity("RecipeWiki.Entities.User", b =>
                {
                    b.Navigation("StoredIngredients");

                    b.Navigation("UserMeals");
                });
#pragma warning restore 612, 618
        }
    }
}
