using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using WebApplicationTest.Models;

namespace WebApplicationTest.Controllers
{
    [Route("api/Note")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private ApplicationContext _context;

        public NoteController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet("getNotes")]
        public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
        {
            return await _context.Notes.ToArrayAsync();
        }

        [HttpGet("getNote")]
        public async Task<ActionResult<Note>> GetNote(Guid id)
        {
            var note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == id);
            if (note == null)
            {
                return NotFound();
            }
            return note;
        }

        [HttpGet("addNote")]
        public async Task<ActionResult> AddNote()
        {
            var note = new Note { Id = Guid.NewGuid(), Date = DateTime.Now };
            _context.Notes.Add(note);
            await _context.SaveChangesAsync();
            return Ok(note);
        }

        [HttpPut("putNote/{id}")]
        public async Task<ActionResult> PutNote(Guid id, string newText)
        {
            var note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == id);
            if (note != null)
            {
                note.Text = newText;
                _context.Notes.Update(note);
                await _context.SaveChangesAsync();
                return Ok(true);
            }
            return NotFound(false);
        }

        [HttpDelete("deleteNote/{id}")]
        public async Task<ActionResult> DeleteNote(Guid id)
        {
            var note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == id);
            if (note != null)
            {
                _context.Notes.Remove(note);
                await _context.SaveChangesAsync();
                return Ok(true);
            }
            return NotFound(false);
        }
    }
}