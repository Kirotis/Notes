﻿using System;

namespace WebApplicationTest.Models
{
    public class Note
    {
        public Guid Id { get; set; }

        public string Title{ get; set; }

        public string Text { get; set; }

        public DateTime Date { get; set; }
    }
}
