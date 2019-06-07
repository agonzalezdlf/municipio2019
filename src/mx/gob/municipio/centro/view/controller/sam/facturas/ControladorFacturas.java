
package mx.gob.municipio.centro.view.controller.sam.facturas;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.gob.municipio.centro.model.gateways.sam.GatewayBeneficiario;
import mx.gob.municipio.centro.model.gateways.sam.GatewayBitacora;
import mx.gob.municipio.centro.model.gateways.sam.GatewayFacturas;
import mx.gob.municipio.centro.model.gateways.sam.GatewayOrdenDePagos;
import mx.gob.municipio.centro.model.gateways.sam.GatewayTipoFacturas;
import mx.gob.municipio.centro.model.gateways.sam.GatewayUnidadAdm;
import mx.gob.municipio.centro.model.gateways.sam.catalogos.GatewayMeses;
import mx.gob.municipio.centro.view.bases.ControladorBase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/sam/facturas/captura_factura.action")
public class ControladorFacturas extends ControladorBase {

	private static Logger log = 
	        Logger.getLogger(ControladorFacturas.class.getName());
	
	public ControladorFacturas(){}
	
	@Autowired
	GatewayUnidadAdm gatewayUnidadAdm;
	
	@Autowired
	private GatewayBitacora gatewayBitacora;
	
	@Autowired 
	GatewayFacturas gatewayFacturas;
	
	@Autowired
	private GatewayBeneficiario gatewayBeneficiario;
	
	@Autowired
	GatewayMeses gatewayMeses;
	
	@Autowired
	private GatewayTipoFacturas gatewayTipoFacturas;
	
	@Autowired
	private GatewayOrdenDePagos gatewayOrdenDePagos;
	
	@ModelAttribute("unidadesAdmiva")
    public List<Map<String, Object>> getUnidadesAdmivas(){
    	return gatewayUnidadAdm.getUnidadAdmTodos();	
    }

	@SuppressWarnings("unchecked")
	@RequestMapping(method = {RequestMethod.GET})  
	public String requestGetControlador(Map modelo, HttpServletRequest request, HttpServletResponse response) {
		
		String cve_benefi= request.getParameter("cboprestadorservicio");
		String unidad=request.getParameter("cbodependencia")==null ?this.getSesion().getClaveUnidad() : request.getParameter("cbodependencia");
		modelo.put("idUnidad",unidad);
		modelo.put("nombreUnidad",this.getSesion().getUnidad());
		modelo.put("FECHA_DEVENGADO", new Date());
		modelo.put("mesesActivos",gatewayMeses.getTodosMesesEjercicioActivos(getSesion().getEjercicio()));
		modelo.put("CVE_BENEFI",cve_benefi );
		modelo.put("clv_benefi",gatewayBeneficiario.getBeneficiariosTodos(0));
		modelo.put("tipoDocumentosFAC",gatewayTipoFacturas.getTipoDocumentosUsuario(getSesion().getIdUsuario()));
		modelo.put("cbotipodocumento", 0);
		Long cve_factura = request.getParameter("CVE_FACTURA")==null ? 0L : Long.parseLong(request.getParameter("CVE_FACTURA").toString());
		
		if(cve_factura!=0){
			Map data = gatewayFacturas.getFactura(cve_factura);
			modelo.put("factura", data);
			modelo.put("cbotipodocumento", data.get("ID_TIPO"));
			modelo.put("ProyectoPartida", gatewayFacturas.getDetallesProyectoPartidaDocumento(cve_factura, this.getSesion().getEjercicio()));
			modelo.put("idUnidad",data.get("ID_DEPENDENCIA").toString());
			
		}
		
		if (this.getSesion().getIdGrupo() == null){
			modelo.put("mensaje","El usuario no tiene asignado un grupo de firmas ");
			return "insuficientes_permisos.jsp";
		} 
		
		return "sam/facturas/captura_factura.jsp";
	}
	
	public int getMesActivo(){
		return gatewayMeses.getMesActivo(this.getSesion().getEjercicio());
	}
	
    @ModelAttribute("tipoRetenciones")
    public List<Map<String, Object>> getTodasTipoRetencionesTodas(){
    	return gatewayOrdenDePagos.getTodasTipoRetencionesTodas();	
    }
    
    @ModelAttribute("tipoFacturas")
    public List<Map<String, Object>> getTipoFacturas(){
    	return gatewayFacturas.getTipoFacturas();
    }
    
    @ModelAttribute("beneficiarios")
	public List<Map<String, Object>>getBeneficiarios(){
		return (List<Map<String, Object>>) gatewayBeneficiario.getListaBeneficiarios();
	}
    
	public String getBeneficiarioFactura(String tipo_doc, Long cve_doc)
	{
		return gatewayFacturas.getBeneficiarioFactura(tipo_doc, cve_doc);
	}
	
	public Map<String, Object> getPresupuestoDocumento(String tipo_doc, Long cve_doc){
		return gatewayFacturas.getPresupuesto(tipo_doc, cve_doc, this.getSesion().getEjercicio());
	}
	
	public Long guardarFactura(Long cve_factura, String tipo_doc, Long cve_doc, int idTipoFactura, int idDependencia, int idProyecto, String clv_partid, String clv_benefi, int idEntrada, String num_fact, Double iva, Double subtotal, Double total,  String observacion, String fecha_doc){
		return gatewayFacturas.guardarFactura(cve_factura, tipo_doc, cve_doc, idTipoFactura, idDependencia, idProyecto, clv_partid, clv_benefi, idEntrada, num_fact, iva, subtotal, total,  observacion, this.formatoFecha(fecha_doc), this.getSesion().getEjercicio(), this.getSesion().getIdUsuario());
	}
	
	public void cerrarFactura(Long cve_factura)
	{
		gatewayFacturas.cerrarFactura(cve_factura, this.getSesion().getIdUsuario(), this.getSesion().getEjercicio());
	}
	
	public List<Map<String, Object>> getArchivosFactura(Long cve_factura){
		return this.gatewayFacturas.getArchivosFactura(cve_factura);
	}
	public void eliminarArchivoFactura(Long idArchivo, HttpServletRequest request){
		gatewayFacturas.eliminarArchivoFactura(this.getSesion().getIdUsuario(), idArchivo, request);
	}
	
	public void guardarRetencion(final Integer idRetencion, final String  retencion,final Double importeRetencion, final Long cve_factura){
		gatewayFacturas.guardarRetencion(idRetencion, retencion, importeRetencion, cve_factura);
	}
	
	public List getRetenciones(Long cve_factura) {	
		return gatewayFacturas.getRetenciones(cve_factura);
	}
	
	public List geVales(Long cve_factura){
		return gatewayFacturas.getVales(cve_factura);
	}
	public void eliminarRetenciones(final List<Integer> retenciones,final  Long cve_factura){
		gatewayFacturas.eliminarRetenciones(retenciones, cve_factura);
	}
	
	public void borrarDatosNomina(){
		gatewayFacturas.borrarDatosNomina();
	}
	
	public void guardarComprobacionVale(Long idMovVale, Long cve_factura, Long cve_vale, int idProyecto, String clv_partid, Double importe)
	{
		gatewayFacturas.guardarComprobacionVale(idMovVale, cve_factura, cve_vale, idProyecto, clv_partid, importe);
		//return gatewayComprobacionesVales.actualizarConceptoPrincipalVale(idVale, vale, importe,importeValeAnte, idOrden,idproyecto,partida,"OP",getfechaActual(),null, getSesion().getEjercicio(), getSesion().getIdUsuario());
	}
	
	public List getListaVales (Long cve_factura) {
	    	 return gatewayFacturas.getListaVales(cve_factura);
	}
	
	public List<Map<String, Object>> getValesDisponibles (int idDependencia, int  idProyecto, String clv_partid ) {
		List<Map<String, Object>> m = gatewayFacturas.getValesDisponibles(idDependencia, idProyecto, clv_partid);
		return m;
	}
	
	public void  eliminarVales( final List<Integer> lstVales) {
		  gatewayFacturas.eliminarVales(lstVales, this.getSesion().getIdUsuario());  		  	  
	  }
	
	public void agregarMovimiento(Long cve_factura, int idProyecto, String clv_partid, Double importe, String notas)
    {
		gatewayFacturas.guardarDetalle(cve_factura, idProyecto, clv_partid, importe, notas);
    }
	
	
	public List<Map<String, Object>> getDetallesFactura(Long cve_factura)
	{
		return gatewayFacturas.getDetallesFactura(cve_factura);
	}
	
	public void eliminarDetalles(Long cve_factura, List<String> detalles)
	{
		gatewayFacturas.eliminarDetalles(cve_factura, detalles);
	}
	
	public List<Map<String, Object>> cargarDetallePresupuestal(Long cve_factura)
	{
		return gatewayFacturas.getDetallesProyectoPartidaDocumento(cve_factura, this.getSesion().getEjercicio());
	}
	
	
}
