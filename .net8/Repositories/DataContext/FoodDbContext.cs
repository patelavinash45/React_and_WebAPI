using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Repositories.DataModels;

namespace FoodDbContext;

public partial class FoodContext : DbContext
{
    public FoodContext()
    {
    }

    public FoodContext(DbContextOptions<FoodContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cart> Carts { get; set; }

    public virtual DbSet<FoodList> FoodLists { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderDetail> OrderDetails { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("User ID = postgres;Password=aVI@12345;Server=localhost;Port=5432;Database=Food;Pooling=true;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cart>(entity =>
        {
            entity.HasKey(e => e.CartId).HasName("Cart_pkey");

            entity.Property(e => e.CartId)
                .UseIdentityAlwaysColumn()
                .HasIdentityOptions(null, null, null, 9999999L, null, null);

            entity.HasOne(d => d.Food).WithMany(p => p.Carts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Food_Fk");

            entity.HasOne(d => d.User).WithMany(p => p.Carts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("User_Fk");
        });

        modelBuilder.Entity<FoodList>(entity =>
        {
            entity.HasKey(e => e.FoodId).HasName("FoodList_pkey");

            entity.Property(e => e.FoodId)
                .UseIdentityAlwaysColumn()
                .HasIdentityOptions(null, null, null, 9999999L, null, null);
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderId).HasName("Orders_pkey");

            entity.Property(e => e.OrderId).HasIdentityOptions(null, null, null, 9999999L, null, null);

            entity.HasOne(d => d.User).WithMany(p => p.Orders)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("UserId_fk");
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.HasKey(e => e.OrderDetailsId).HasName("OrderDetails_pkey");

            entity.Property(e => e.OrderDetailsId)
                .UseIdentityAlwaysColumn()
                .HasIdentityOptions(null, null, null, 9999999L, null, null);

            entity.HasOne(d => d.Food).WithMany(p => p.OrderDetails)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FoodId_fk");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderDetails)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("OrderId_fk");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("User_pkey");

            entity.Property(e => e.UserId)
                .UseIdentityAlwaysColumn()
                .HasIdentityOptions(null, null, null, 9999999L, null, null);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
