﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RecipeWiki.Data;

#nullable disable

namespace RecipeWiki.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20230131193747_UserIngridientQuantityToMeasure")]
    partial class UserIngridientQuantityToMeasure
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.2");

            modelBuilder.Entity("RecipeWiki.Entities.CustomMeal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Instructions")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int?>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("CustomMeal");
                });

            modelBuilder.Entity("RecipeWiki.Entities.Ingredient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("CustomMealId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("IngredientInfoId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Measure")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CustomMealId");

                    b.ToTable("Ingredient");
                });

            modelBuilder.Entity("RecipeWiki.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("BLOB");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("BLOB");

                    b.Property<string>("SavedMealsIds")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("RecipeWiki.Entities.CustomMeal", b =>
                {
                    b.HasOne("RecipeWiki.Entities.User", null)
                        .WithMany("UserMeals")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("RecipeWiki.Entities.Ingredient", b =>
                {
                    b.HasOne("RecipeWiki.Entities.CustomMeal", null)
                        .WithMany("Ingredients")
                        .HasForeignKey("CustomMealId");
                });

            modelBuilder.Entity("RecipeWiki.Entities.CustomMeal", b =>
                {
                    b.Navigation("Ingredients");
                });

            modelBuilder.Entity("RecipeWiki.Entities.User", b =>
                {
                    b.Navigation("UserMeals");
                });
#pragma warning restore 612, 618
        }
    }
}
