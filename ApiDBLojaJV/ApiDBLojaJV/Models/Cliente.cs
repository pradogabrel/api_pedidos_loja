using System;
using System.Collections.Generic;

namespace ApiDBLojaJV.Models;

public partial class Cliente
{
    public int IdCliente { get; set; }

    public string NomeCliente { get; set; } = null!;

    public string EmailCliente { get; set; } = null!;

    public virtual ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();
}
